import type { GetOptions, GetResult } from '@fingerprint/agent'
import type { FingerprintSvelteContext } from './types'
import { writable } from 'svelte/store'
import { getContext, onMount } from 'svelte'
import { FINGERPRINT_CONTEXT } from './symbols'
import type { UseGetVisitorDataResult, UseVisitorDataOptions } from './useVisitorData.types'

/** Reactive hook for fetching Fingerprint visitor data. Must be called inside a component wrapped with {@link FingerprintProvider}. */
export function useVisitorData({
  immediate = true,
  ...getOptionsDefaults
}: UseVisitorDataOptions = {}): UseGetVisitorDataResult {
  const dataValue = writable<GetResult | undefined>(undefined)
  const loadingValue = writable(false)
  const isFetchedValue = writable(false)
  const errorValue = writable<Error | undefined>(undefined)

  const context = getContext<FingerprintSvelteContext | undefined>(FINGERPRINT_CONTEXT)

  if (!context) {
    throw new Error('Fingerprint context is missing. Did you forget to wrap your component with <FingerprintProvider>?')
  }

  const getData = async (options?: GetOptions): Promise<GetResult> => {
    loadingValue.set(true)
    isFetchedValue.set(false)
    dataValue.set(undefined)
    errorValue.set(undefined)

    try {
      const mergedOptions: GetOptions = { ...getOptionsDefaults, ...options }
      const result = await context.getVisitorData(mergedOptions)

      dataValue.set(result)
      isFetchedValue.set(true)

      return result
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error(String(error))
      errorValue.set(normalizedError)

      throw normalizedError
    } finally {
      loadingValue.set(false)
    }
  }

  onMount(async () => {
    if (immediate) {
      try {
        await getData()
      } catch (error) {
        // getData() rethrows so manual callers can handle errors themselves.
        // Swallow here to avoid an unhandled rejection during onMount — the error is already stored in the error store.
        console.error('Failed to fetch visitor data on mount:', error)
      }
    }
  })

  return {
    data: dataValue,
    error: errorValue,
    isLoading: loadingValue,
    isFetched: isFetchedValue,
    getData,
  }
}
