# Migrating from v2 to v3

This guide covers breaking changes when upgrading from `@fingerprintjs/fingerprintjs-pro-svelte` v2 (JS Agent v3) to `@fingerprint/svelte` v3 (JS Agent v4).

## Package renamed

The package has been renamed from `@fingerprintjs/fingerprintjs-pro-svelte` to `@fingerprint/svelte`. Update your dependencies:

```shell
npm uninstall @fingerprintjs/fingerprintjs-pro-svelte
npm install @fingerprint/svelte
```

Update all imports:

```diff
- import { FingerprintProvider, useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte'
+ import { FingerprintProvider, useVisitorData } from '@fingerprint/svelte'
```

## Svelte 5 support

The `svelte` peer dependency has been widened to `^4.0.0 || ^5.0.0`. The SDK source uses Svelte 4 syntax, which Svelte 5 compiles automatically via its built-in legacy mode. No code changes are needed to use the SDK in a Svelte 5 project.

## JS Agent upgrade (v3 to v4)

The underlying Fingerprint JS Agent has been upgraded from v3 (`@fingerprintjs/fingerprintjs-pro-spa`) to v4 (`@fingerprint/agent`). See the [JS Agent v3 to v4 migration guide](https://docs.fingerprint.com/reference/migrating-from-v3-to-v4) for the full list of agent-level changes.

## Provider changes

The `FpjsProvider` component has been renamed to `FingerprintProvider` with a simplified options format.

```diff
 <script>
-  import { FpjsProvider, FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-svelte'
+  import { FingerprintProvider } from '@fingerprint/svelte'

   const options = {
-    loadOptions: {
-      apiKey: '<YOUR_API_KEY>',
-      endpoint: ['https://metrics.yourwebsite.com', FingerprintJSPro.defaultEndpoint],
-      scriptUrlPattern: [
-        'https://metrics.yourwebsite.com/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
-        FingerprintJSPro.defaultScriptUrlPattern,
-      ],
-      region: 'eu',
-    },
+    apiKey: '<YOUR_API_KEY>',
+    endpoints: ['https://metrics.yourwebsite.com'],
+    region: 'eu',
   }
 </script>

-<FpjsProvider {options}>
+<FingerprintProvider {options}>
   <slot />
-</FpjsProvider>
+</FingerprintProvider>
```

Key changes:

- `FpjsProvider` renamed to `FingerprintProvider`
- The `loadOptions` wrapper is removed — pass options directly (flat)
- `FingerprintJSPro.defaultEndpoint` and `FingerprintJSPro.defaultScriptUrlPattern` are no longer needed — the agent automatically falls back to defaults
- `endpoint` renamed to `endpoints` (plural)
- `scriptUrlPattern` removed entirely

## `useVisitorData` changes

The hook now takes a single options object instead of two arguments.

```diff
 <script>
-  import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte'
+  import { useVisitorData } from '@fingerprint/svelte'

-  const { getData, data, isLoading, error } = useVisitorData({ extendedResult: true }, { immediate: true })
+  const { getData, data, isLoading, isFetched, error } = useVisitorData({
+    immediate: true,
+  })
 </script>
```

Key changes:

- Single options object (merged `GetOptions` + `{ immediate }`)
- New `isFetched` store — `true` after a successful fetch, resets on new calls
- `getData()` now rethrows errors (catch them in your click handlers)
- `ignoreCache` option removed (see caching section below)

## Caching migration

**Caching is now disabled by default.** In v2, results were cached in `sessionStorage` automatically. In v3, you must explicitly configure caching via the `cache` option passed to `FingerprintProvider`. If you relied on the default `sessionStorage` cache, add an explicit cache configuration to preserve that behavior.

| v2 (JS Agent v3) | v3 (JS Agent v4) |
| --- | --- |
| Cached by default (`sessionStorage`) | **No caching by default** — must opt in explicitly |
| `cacheLocation: 'memory' \| 'localstorage' \| 'sessionstorage'` | `cache: { storage: 'sessionStorage', duration: 3600 }` |
| `ignoreCache: true` in `useVisitorData` options | Removed — no cache to ignore unless explicitly configured |
| `LocalStorageCache`, `SessionStorageCache`, `InMemoryCache` re-exports | Removed — configure via `@fingerprint/agent` directly |

See the [JS Agent v4 caching documentation](https://docs.fingerprint.com/reference/js-agent-v4-start-function#cache) for configuration details.

## Removed exports

The following re-exports from `@fingerprintjs/fingerprintjs-pro-spa` have been removed:

- `FingerprintJSPro` namespace (use `Fingerprint` re-exported from `@fingerprint/svelte` instead)
- `FpjsClient` class
- `FpjsSvelteContext`, `FpjsVisitorQueryData`, `FpjsSvelteOptions` types (renamed to `FingerprintSvelteContext`, `FingerprintVisitorQueryData`, `FingerprintSvelteOptions`)
- `LocalStorageCache`, `SessionStorageCache`, `InMemoryCache`, `CacheLocation`
- `FpjsProvider` component (renamed to `FingerprintProvider`)
- Granular subpath exports (`/client`, `/types`, `/symbols`, etc.) — import everything from the package root

## Error handling

`getData()` now rethrows errors after storing them in the `error` store (previously it returned `undefined` on failure). If you call `getData()` in a click handler, wrap it in a try/catch.

The `FPJSAgentError` error name rewriting from v2 has been removed — errors now pass through from the JS Agent as `FingerprintError` instances with a `code` property identifying the specific error. If your code checks `error.name === 'FPJSAgentError'`, update it to use `Fingerprint.isFingerprintError()` and check `error.code` instead.

**Before (v2):**

```svelte
<script>
  async function handleClick() {
    const result = await getData()
    if (!result) {
      // getData() returned undefined on failure
    }
  }
</script>

{#if $error}
  {#if $error.name === 'FPJSAgentError'}
    <p>Agent error: {$error.message}</p>
  {/if}
{/if}
```

**After (v3):**

```svelte
<script>
  import { useVisitorData, Fingerprint } from '@fingerprint/svelte'

  const { getData, data, error } = useVisitorData({ immediate: false })

  async function handleClick() {
    try {
      await getData()
    } catch (err) {
      if (Fingerprint.isFingerprintError(err)) {
        switch (err.code) {
          case 'api_key_invalid':
          case 'api_key_missing':
            console.error('Configuration error:', err.message)
            break
          case 'client_timeout':
          case 'network_connection':
            console.error('Network error:', err.message)
            break
          default:
            console.error('Fingerprint error:', err.code, err.message)
        }
      }
    }
  }
</script>

<button on:click={handleClick}>Identify</button>
{#if $error}
  <p>{$error.message}</p>
{/if}
```

See the [JS Agent v4 error handling documentation](https://docs.fingerprint.com/reference/js-agent-v4-error-handling) for the full list of error codes.
