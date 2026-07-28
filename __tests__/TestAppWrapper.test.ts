import { describe, it, expect, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/svelte'
import TestApp from './TestAppWrapper.svelte'
import { mockGet, mockStart } from './setup'
import userEvent from '@testing-library/user-event'
import { VERSION, INTEGRATION_INFO_PACKAGE_NAME } from '../src/lib/version'

const testData = {
  visitor_id: '#visitor_id',
  event_id: 'test-event-id',
  sealed_result: null,
}

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((promiseResolve) => {
    resolve = promiseResolve
  })

  return { promise, resolve }
}

describe('FingerprintProvider + useVisitorData', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockStart.mockClear()
  })

  it('shows visitor data while exposing loading state during a manual fetch', async () => {
    const visitorData = deferred<typeof testData>()

    mockGet.mockReturnValue(visitorData.promise)

    const { getByRole, getByText, queryByText } = render(TestApp, { props: { immediate: false } })

    await userEvent.click(getByRole('button', { name: /get data/i }))

    expect(getByText('Loading...')).toBeTruthy()

    visitorData.resolve(testData)

    await waitFor(() => {
      expect(queryByText('Loading...')).toBeNull()
    })
    expect(getByText((content) => content.includes(testData.visitor_id))).toBeTruthy()
  })

  it('shows errors from a failed manual fetch', async () => {
    mockGet.mockRejectedValue(new Error('Error!'))

    const { findByText, getByRole } = render(TestApp, { props: { immediate: false } })

    await userEvent.click(getByRole('button', { name: /get data/i }))

    expect(await findByText('Error!')).toBeTruthy()
  })

  it('sets isFetched after a successful manual fetch', async () => {
    mockGet.mockResolvedValue(testData)

    const { getByRole, getByText, queryByText } = render(TestApp, { props: { immediate: false } })

    expect(queryByText('Fetched')).toBeNull()

    await userEvent.click(getByRole('button', { name: /get data/i }))

    expect(getByText('Fetched')).toBeTruthy()
  })

  it('forwards provider options and appends SDK integrationInfo when the agent starts', async () => {
    mockGet.mockResolvedValue(testData)

    const { getByRole } = render(TestApp, {
      props: {
        immediate: false,
        providerOptions: {
          apiKey: 'test-api-key',
          region: 'eu',
          endpoints: ['https://metrics.example.com'],
          integrationInfo: ['custom/1.0'],
        },
      },
    })

    expect(mockStart).not.toHaveBeenCalled()

    await userEvent.click(getByRole('button', { name: /get data/i }))

    expect(mockStart).toHaveBeenCalledTimes(1)
    expect(mockStart).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: 'test-api-key',
        region: 'eu',
        endpoints: ['https://metrics.example.com'],
        integrationInfo: expect.arrayContaining(['custom/1.0', `${INTEGRATION_INFO_PACKAGE_NAME}/${VERSION}`]),
      })
    )
  })

  it('reuses the started agent on subsequent manual fetches', async () => {
    mockGet.mockResolvedValue(testData)

    const { getByRole } = render(TestApp, { props: { immediate: false } })

    const button = getByRole('button', { name: /get data/i })
    await userEvent.click(button)
    await userEvent.click(button)

    expect(mockStart).toHaveBeenCalledTimes(1)
  })

  it('passes per-call GetOptions through to the agent', async () => {
    mockGet.mockResolvedValue(testData)

    const getDataOptions = { tag: 'my-tag', linkedId: 'my-link' }
    const { getByRole } = render(TestApp, { props: { immediate: false, getDataOptions } })

    await userEvent.click(getByRole('button', { name: /get data/i }))

    expect(mockGet).toHaveBeenCalledWith(getDataOptions)
  })
})
