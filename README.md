<p align="center">
  <a href="https://fingerprint.com">
    <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://fingerprintjs.github.io/home/resources/logo_light.svg" />
     <source media="(prefers-color-scheme: light)" srcset="https://fingerprintjs.github.io/home/resources/logo_dark.svg" />
     <img src="https://fingerprintjs.github.io/home/resources/logo_dark.svg" alt="Fingerprint logo" width="312px" />
   </picture>
  </a>

</p>
<p align="center">
   <a href="https://github.com/fingerprintjs/svelte/actions/workflows/release.yml"><img src="https://github.com/fingerprintjs/svelte/actions/workflows/release.yml/badge.svg" alt="Release status"></a>
   <a href="https://github.com/fingerprintjs/svelte/actions/workflows/test.yml"><img src="https://github.com/fingerprintjs/svelte/actions/workflows/test.yml/badge.svg" alt="Tests status"></a>
   <a href="https://www.npmjs.com/package/@fingerprint/svelte"><img src="https://img.shields.io/npm/v/@fingerprint/svelte.svg" alt="Current NPM version"></a>
   <a href="https://www.npmjs.com/package/@fingerprint/svelte"><img src="https://img.shields.io/npm/dm/@fingerprint/svelte.svg" alt="Monthly downloads from NPM"></a>
   <a href="https://fingerprintjs.github.io/svelte/coverage/"><img src="https://fingerprintjs.github.io/svelte/coverage/badges.svg" alt="coverage"></a>
   <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license"></a>
   <a href="https://discord.gg/39EpE2neBg"><img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server"></a> 
   <a href="https://fingerprintjs.github.io/svelte/"><img src="https://img.shields.io/badge/-Documentation-green" alt="Documentation"></a>
</p>

# Fingerprint Svelte SDK

[Fingerprint](https://fingerprint.com/) is a device intelligence platform offering industry-leading accuracy.

Fingerprint Svelte SDK is an easy way to integrate Fingerprint into your Svelte or [Svelte-kit](https://kit.svelte.dev/) application. See example apps in the [examples](./examples) folder.

## Requirements

- Svelte 4.0.0 or higher
- For TypeScript users: TypeScript 4.8 or higher

### Svelte 5 compatibility

The SDK uses the Svelte 4 API ([stores](https://svelte.dev/docs/svelte/svelte-store), `$store` syntax) and works in Svelte 5 unchanged thanks to the compiler's built-in [legacy mode](https://svelte.dev/docs/svelte/legacy-overview).

This package works with the commercial [Fingerprint platform](https://fingerprint.com/). It is not compatible with the open-source [FingerprintJS library](https://github.com/fingerprintjs/fingerprintjs). Learn more about the [differences between Fingerprint and FingerprintJS](https://fingerprint.com/github/).

## Installation

Yarn:
```shell
yarn add @fingerprint/svelte
```

npm:
```shell
npm install @fingerprint/svelte
```

pnpm:
```shell
pnpm add @fingerprint/svelte
```

## Getting started

In order to identify visitors, you'll need a Fingerprint account (you can [sign up for free](https://dashboard.fingerprint.com/signup/)).
To get your API key and get started, see the [Quick start guide in our documentation](https://docs.fingerprint.com/docs/quick-start-guide).

1. Wrap your application (or component) in `FingerprintProvider`. You can specify multiple configuration options. Set a [region](https://docs.fingerprint.com/docs/regions) if you have chosen a non-global region during registration. Set `endpoints` if you are using [one of our proxy integrations to increase accuracy](https://docs.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers) and effectiveness of visitor identification.

```svelte
// App.svelte
<script>
  import { FingerprintProvider } from '@fingerprint/svelte'
  import VisitorData from './VisitorData.svelte'

  const options = {
    apiKey: '<YOUR_API_KEY>',
    endpoints: ['https://metrics.yourwebsite.com'],
    region: 'eu',
  }
</script>

<FingerprintProvider {options}>
  <VisitorData />
</FingerprintProvider>
```

2. Use the `useVisitorData` function in your Svelte components to identify visitors and get the results.

```svelte
// VisitorData.svelte
<script>
  import { useVisitorData } from '@fingerprint/svelte'

  const { getData, data, isLoading, isFetched, error } = useVisitorData({ immediate: true })

  async function handleClick() {
    try {
      await getData()
    } catch {
      // Error is available in the $error store
    }
  }
</script>

<div>
  <button on:click={handleClick}>Get data</button>
  {#if $isLoading}
    <div>Loading...</div>
  {/if}
  {#if $error}
    <div>Error: {$error.message}</div>
  {/if}
  {#if $data}
    <pre>{JSON.stringify($data, null, 2)}</pre>
  {/if}
</div>
```

See the full code in the provided [example applications](./examples).

## Linking and tagging information

The `visitor_id` provided by Fingerprint Identification is especially useful when combined with information you already know about your users, for example, account IDs, order IDs, etc. To learn more about various applications of the `linkedId` and `tag`, see [Linking and tagging information](https://docs.fingerprint.com/docs/tagging-information).

Associate the visitor ID with your data using the `linkedId` or `tag` parameter of the options object passed into the `useVisitorData()` hook:

```svelte
<script>
  import { useVisitorData } from '@fingerprint/svelte'

  const { getData, data, isLoading, error } = useVisitorData({
    linkedId: 'user_1234',
    tag: {
      userAction: 'login',
      analyticsId: 'UA-5555-1111-1',
    },
  })
</script>
```

## Caching strategy

Fingerprint usage is billed per API call. To avoid unnecessary API calls, it is a good practice to [cache identification results](https://docs.fingerprint.com/docs/caching-visitor-information).

Starting with JS Agent v4, there is **no caching by default**. To enable caching, pass a `cache` option to `FingerprintProvider`:

```svelte
<script>
  import { FingerprintProvider } from '@fingerprint/svelte'

  const options = {
    apiKey: '<YOUR_API_KEY>',
    cache: {
      storage: 'sessionStorage',
      duration: 3600, // 1 hour in seconds (max 43200)
    },
  }
</script>

<FingerprintProvider {options}>
  <VisitorData />
</FingerprintProvider>
```

See the [JS Agent caching documentation](https://docs.fingerprint.com/reference/js-agent-v4-start-function#cache) for more details.

## Migration from v2.x

Version 3.0 upgrades the underlying Fingerprint agent from v3 to v4 and introduces several breaking changes. See the [migration guide](docs/migration-v2-to-v3.md) for detailed instructions and the [JavaScript agent v3 to v4 migration guide](https://docs.fingerprint.com/reference/migrating-from-v3-to-v4) for underlying agent changes.

## Documentation

See the [generated SDK API reference here](https://fingerprintjs.github.io/svelte/).

This library uses the Fingerprint JavaScript agent under the hood. See our documentation for the full [JavaScript Agent API reference](https://docs.fingerprint.com/reference/js-agent-v4).

## Error handling

`getData()` rethrows errors from the JS Agent after storing them in the `error` store. Non-Error values are normalized into `Error` instances. See [JS Agent error handling](https://docs.fingerprint.com/reference/js-agent-v4-error-handling) for more details.

## Support and feedback

To report problems, ask questions or provide feedback, please use [Issues](https://github.com/fingerprintjs/svelte/issues). If you need private support, you can email us at [oss-support@fingerprint.com](mailto:oss-support@fingerprint.com).

## License

This project is licensed under the [MIT license](https://github.com/fingerprintjs/svelte/blob/main/LICENSE).

