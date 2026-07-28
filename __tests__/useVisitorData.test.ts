import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render } from '@testing-library/svelte'
import { get } from 'svelte/store'
import { tick } from 'svelte'
import { mockGet, mockStart } from './setup'
import UseVisitorDataWrapper from './UseVisitorDataWrapper.svelte'
import type { UseGetVisitorDataResult, UseVisitorDataOptions } from '../src/lib'

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

function mountUseVisitorData(hookOptions?: UseVisitorDataOptions) {
  let api!: UseGetVisitorDataResult

  render(UseVisitorDataWrapper, {
    props: {
      hookOptions,
      onApi: (result: UseGetVisitorDataResult) => {
        api = result
      },
    },
  })

  return { api }
}

describe('useVisitorData', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockStart.mockClear()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('rejects imperative getData() and stores the error', async () => {
    const testError = new Error('Test error')
    mockGet.mockRejectedValue(testError)

    const { api } = mountUseVisitorData({ immediate: false })

    await expect(api.getData()).rejects.toThrow('Test error')

    expect(get(api.error)).toBe(testError)
    expect(get(api.isFetched)).toBe(false)
    expect(get(api.isLoading)).toBe(false)
  })

  it('normalizes non-Error rejections into Error objects', async () => {
    mockGet.mockRejectedValue('string error')

    const { api } = mountUseVisitorData({ immediate: false })

    await expect(api.getData()).rejects.toThrow('string error')

    expect(get(api.error)).toBeInstanceOf(Error)
    expect(get(api.error)?.message).toBe('string error')
    expect(get(api.isFetched)).toBe(false)
  })

  it('resets isFetched and data when a new fetch begins', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData({ immediate: false })

    await api.getData()
    expect(get(api.isFetched)).toBe(true)
    expect(get(api.data)).toEqual(testData)

    const visitorData = deferred<typeof testData>()
    mockGet.mockReturnValueOnce(visitorData.promise)

    const pending = api.getData()

    expect(get(api.isFetched)).toBe(false)
    expect(get(api.data)).toBeUndefined()
    expect(get(api.isLoading)).toBe(true)

    visitorData.resolve(testData)
    await pending

    expect(get(api.isFetched)).toBe(true)
    expect(get(api.data)).toEqual(testData)
    expect(get(api.error)).toBeUndefined()
    expect(get(api.isLoading)).toBe(false)
  })

  it('merges default options with per-call options', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData({ immediate: false, tag: 'default-tag', linkedId: 'default-link' })

    await api.getData({ tag: 'override-tag' })

    expect(mockGet).toHaveBeenCalledWith({ tag: 'override-tag', linkedId: 'default-link' })
  })

  it('passes default options when no per-call options given', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData({ immediate: false, linkedId: 'my-link' })

    await api.getData()

    expect(mockGet).toHaveBeenCalledWith({ linkedId: 'my-link' })
  })

  it('provides fresh data after a failed fetch', async () => {
    mockGet.mockRejectedValueOnce(new Error('fail'))

    const { api } = mountUseVisitorData({ immediate: false })

    await expect(api.getData()).rejects.toThrow('fail')

    mockGet.mockResolvedValueOnce(testData)

    await expect(api.getData()).resolves.toEqual(testData)

    expect(get(api.data)).toEqual(testData)
    expect(get(api.error)).toBeUndefined()
    expect(get(api.isFetched)).toBe(true)
  })

  it('fetches visitor data immediately on mount by default', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData()

    await vi.waitFor(() => {
      expect(mockGet).toHaveBeenCalledTimes(1)
    })
    await vi.waitFor(() => {
      expect(get(api.data)).toEqual(testData)
    })

    expect(mockGet).toHaveBeenCalledWith({})
    expect(get(api.error)).toBeUndefined()
    expect(get(api.isFetched)).toBe(true)
    expect(get(api.isLoading)).toBe(false)
  })

  it('does not fetch on mount when immediate is false', async () => {
    mockGet.mockResolvedValue(testData)

    const { api } = mountUseVisitorData({ immediate: false })

    await tick()

    expect(mockStart).not.toHaveBeenCalled()
    expect(mockGet).not.toHaveBeenCalled()
    expect(get(api.data)).toBeUndefined()
    expect(get(api.error)).toBeUndefined()
    expect(get(api.isFetched)).toBe(false)
    expect(get(api.isLoading)).toBe(false)
  })

  it('uses default options for the immediate mount fetch', async () => {
    mockGet.mockResolvedValue(testData)

    mountUseVisitorData({ tag: 'default-tag', linkedId: 'default-link' })

    await vi.waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith({ tag: 'default-tag', linkedId: 'default-link' })
    })
  })

  it('stores immediate mount fetch errors without rejecting from onMount', async () => {
    const testError = new Error('mount failed')
    mockGet.mockRejectedValue(testError)

    const { api } = mountUseVisitorData()

    await vi.waitFor(() => {
      expect(get(api.error)).toBe(testError)
    })

    expect(console.error).toHaveBeenCalledWith('Failed to fetch visitor data on mount:', testError)
    expect(get(api.isFetched)).toBe(false)
    expect(get(api.isLoading)).toBe(false)
  })
})
