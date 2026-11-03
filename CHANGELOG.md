# @fingerprint/svelte

## 3.1.0

### Minor Changes

- Deprecate `tag` in favor of `tags` ([81ec8ec](https://github.com/fingerprintjs/svelte/commit/81ec8eccfedf9a5609d8e299e83bc5e7dcd17354))

### Patch Changes

- Bump `@fingerprint/agent` dependency to `^4.1.6` ([4accaf8](https://github.com/fingerprintjs/svelte/commit/4accaf84558de19a46b854f042fab847917d3f65))

## 3.0.0

### Major Changes

- Rename package from `@fingerprintjs/fingerprintjs-pro-svelte` to `@fingerprint/svelte`. Update all imports to use the new package name. ([eec67b0](https://github.com/fingerprintjs/svelte/commit/eec67b0d6870881f795535de9ad2d58fc3fe5f69))
- Switch to JS Agent v4 (`@fingerprint/agent`). This is a breaking change.

  - `FpjsProvider` renamed to `FingerprintProvider` with flat options (no `loadOptions` wrapper)
  - `useVisitorData` takes a single merged options object instead of two arguments
  - `getData()` now rethrows errors after storing them in the error store
  - Added `isFetched` store to track successful fetches
  - **Caching is now disabled by default** — you must explicitly configure it via the `cache` option in `FingerprintProvider` to enable caching
  - Removed cache-related exports (`LocalStorageCache`, `SessionStorageCache`, `InMemoryCache`, `CacheLocation`, `ignoreCache`)
  - Removed granular subpath exports — import everything from the package root
  - Removed `FingerprintJSPro` namespace re-export (use `Fingerprint` from `@fingerprint/svelte` or import `@fingerprint/agent` directly) ([2883a96](https://github.com/fingerprintjs/svelte/commit/2883a961feb1ca6aed27a9567583b2554bfceeee))

### Minor Changes

- Widen `svelte` peer dependency to `^4.0.0 || ^5.0.0`, adding official Svelte 5 support. The SDK source uses Svelte 4 syntax which Svelte 5 compiles automatically via its built-in [legacy mode](https://svelte.dev/docs/svelte/legacy-overview). ([73e1588](https://github.com/fingerprintjs/svelte/commit/73e15881410548c5d74f30effa9154906d30f449))

## 3.0.0-rc.0

### Major Changes

- Rename package from `@fingerprintjs/fingerprintjs-pro-svelte` to `@fingerprint/svelte`. Update all imports to use the new package name. ([eec67b0](https://github.com/fingerprintjs/svelte/commit/eec67b0d6870881f795535de9ad2d58fc3fe5f69))
- Switch to JS Agent v4 (`@fingerprint/agent`). This is a breaking change.

  - `FpjsProvider` renamed to `FingerprintProvider` with flat options (no `loadOptions` wrapper)
  - `useVisitorData` takes a single merged options object instead of two arguments
  - `getData()` now rethrows errors after storing them in the error store
  - Added `isFetched` store to track successful fetches
  - **Caching is now disabled by default** — you must explicitly configure it via the `cache` option in `FingerprintProvider` to enable caching
  - Removed cache-related exports (`LocalStorageCache`, `SessionStorageCache`, `InMemoryCache`, `CacheLocation`, `ignoreCache`)
  - Removed granular subpath exports — import everything from the package root
  - Removed `FingerprintJSPro` namespace re-export (use `Fingerprint` from `@fingerprint/svelte` or import `@fingerprint/agent` directly) ([2883a96](https://github.com/fingerprintjs/svelte/commit/2883a961feb1ca6aed27a9567583b2554bfceeee))

### Minor Changes

- Widen `svelte` peer dependency to `^4.0.0 || ^5.0.0`, adding official Svelte 5 support. The SDK source uses Svelte 4 syntax which Svelte 5 compiles automatically via its built-in [legacy mode](https://svelte.dev/docs/svelte/legacy-overview). ([73e1588](https://github.com/fingerprintjs/svelte/commit/73e15881410548c5d74f30effa9154906d30f449))

## [2.2.1](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v2.2.0...v2.2.1) (2024-07-22)

### Bug Fixes

- support passing all `UseVisitorDataOptions` to `getData` function ([0506079](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/05060795e49cb2a28d2810e64ba9993d268e834f))

### Documentation

- **README:** add tag and linkedId section ([9fa0e9b](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/9fa0e9b7c126e9232e2f31738850cb9455aeade9))
- **README:** replace deprecated imports in code examples ([4dfdd48](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/4dfdd48920d2a9dd96a3d4187b15ab84cead81d1))

## [2.2.0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v2.1.0...v2.2.0) (2024-03-27)

### Features

- update @fingerprintjs/fingerprintjs-pro-spa to 1.3.1 ([ba2f92b](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/ba2f92bfe91a09a74f7d7c05d80b75dbce7db558))

### Documentation

- **README:** format badges ([80b368f](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/80b368f17ea163ff3cd2c645ebb317eed3f089b3))

## [2.1.0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v2.0.0...v2.1.0) (2023-10-11)

### Features

- update @fingerprintjs/fingerprintjs-pro-spa to 1.2.0, add FingerprintJSPro export ([0e383eb](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/0e383eb47c918a7b73a3ad86fbb20cf68390b0c6))

### Build System

- **deps:** bump postcss from 8.4.30 to 8.4.31 ([0abcdaa](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/0abcdaa9ec013d05962fddf638f31cd0bcc8a63c))

## [2.0.0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.3.1...v2.0.0) (2023-10-05)

### ⚠ BREAKING CHANGES

- minimal supported svelte version is now 4.0.0

### Features

- set minimal supported version to Svelte 4.0.0 ([c32da25](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/c32da2500689450299268fac4f66cdf48f0d7b17))

### Bug Fixes

- add "dist" to package files ([d4b511f](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/d4b511f1ce0a88309299d136018fcb54ca2d05d2))

### Documentation

- **README:** add introducing sentence ([14e9aaf](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/14e9aafe856d2d074c3f0bf1bbabb1774a4da5ff))
- **README:** add pnpm snippet ([a700463](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/a700463d0bd2d2380f5e5a4eb9a3a767b82d2d3d))
- **README:** add requirements section ([d35926d](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/d35926d9c4c15dae1df08b95b88e2f4aa4593792))
- **README:** add support and feedback section ([edd0722](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/edd07222aad2c1d8c74f1f3553f5bb697e8d3a11))

## [2.0.0-test.1](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.3.1...v2.0.0-test.1) (2023-09-28)

### ⚠ BREAKING CHANGES

- minimal supported svelte version is now 4.0.0

### Features

- set minimal supported version to Svelte 4.0.0 ([c32da25](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/c32da2500689450299268fac4f66cdf48f0d7b17))

### Documentation

- **README:** add introducing sentence ([14e9aaf](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/14e9aafe856d2d074c3f0bf1bbabb1774a4da5ff))
- **README:** add pnpm snippet ([a700463](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/a700463d0bd2d2380f5e5a4eb9a3a767b82d2d3d))
- **README:** add requirements section ([d35926d](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/d35926d9c4c15dae1df08b95b88e2f4aa4593792))
- **README:** add support and feedback section ([edd0722](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/edd07222aad2c1d8c74f1f3553f5bb697e8d3a11))

## [1.3.1](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.3.0...v1.3.1) (2023-09-15)

### Bug Fixes

- bump spa package version to 1.1.2 ([c045025](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/c04502556730152bc175f586784492e7b72366e3))

### Build System

- **deps:** bump semver from 5.7.1 to 5.7.2 ([4819172](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/481917289790babb5a6e81448acc30c274d5a2f4))
- **deps:** bump semver from 5.7.1 to 5.7.2 in /examples/svelte-kit ([574cec2](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/574cec2ad8448298252401673c8bbc29ea9caa0c))
- **deps:** bump tough-cookie from 4.0.0 to 4.1.3 ([fb0f467](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/fb0f4675193afaae8c1dfe94f2a31c8c2dad4d98))
- **deps:** bump vite from 2.9.15 to 2.9.16 ([074c770](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/074c77071056e56ae93a29f685602bf99d6fb531))
- **deps:** bump vite from 2.9.15 to 2.9.16 in /examples/svelte-kit ([a27264f](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/a27264fae5020e26af04b666176a6176d13e703c))
- **deps:** bump word-wrap from 1.2.3 to 1.2.4 ([b77d1ef](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/b77d1efb14b5fb47be8731b4c30aa0cd21bd5428))

### Documentation

- **README:** add coverage ([75f611f](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/75f611f16ea8ac3940415423afab2924b9f3e6eb))

## [1.3.0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.2.1...v1.3.0) (2023-07-06)

### Features

- add reexports for `defaultEndpoint`, `defaultTlsEndpoint`, `defaultScriptUrlPattern` ([ba8e237](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/ba8e237c28c9c2d7784d954d35aa75e6e33d325a))

### Bug Fixes

- update JS Agent with fixed `subdivisions` type ([3a74f3a](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/3a74f3aa7e67811f5c162fa32e55229d379ae4a7))

## [1.2.1](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.2.0...v1.2.1) (2023-04-21)

### Bug Fixes

- bump `@fingerprintjs/fingerprintjs-pro-spa` to v1.0.2 ([4b29429](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/4b294294d92e4c2929a3fdf687aa2430e68196fd))

### Build System

- **deps:** bump http-cache-semantics from 4.1.0 to 4.1.1 ([90cc913](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/90cc913bc2e63c72a4c6d3f655bc20afc096ea0b))
- **deps:** bump json5 from 2.2.1 to 2.2.3 ([5534409](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/55344099ab7b43081ed41c0b756711a5bdd907e5))
- **deps:** bump vite from 2.9.12 to 2.9.15 ([41a11ab](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/41a11ab5f3707e718f3479a951459c7445e832a3))
- **deps:** bump vite from 2.9.12 to 2.9.15 in /examples/svelte-kit ([4e79af1](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/4e79af1e5a81836d7287d68cc23362d233154865))

## [1.2.0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.1.4...v1.2.0) (2023-01-11)

### Features

- log agent errors into console ([c529ce6](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/c529ce602f35265ef8c591ea1e958f94362c9644))

### Documentation

- **README:** improve caching strategies documentation ([2a6ebc5](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/2a6ebc53b345198fa0a6536f324ed0a692c27dca))

## [1.1.4](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.1.3...v1.1.4) (2022-11-25)

### Bug Fixes

- fix invalid package directory being published to NPM ([d9918a8](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/d9918a8f87c2c6bb7e2c8ec37f76a6ebed6591d8))

## [1.1.3](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.1.2...v1.1.3) (2022-11-17)

### Bug Fixes

- update SPA library to 0.7.0 ([26a9acc](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/26a9acc5b64723f81d60a5ed7faee6cec2ac1313))

### Documentation

- **README:** add documentation badge ([a2f0227](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/a2f0227a7547f97e410c3b82019273a6bdcf3d8c))

## [1.1.2](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.1.1...v1.1.2) (2022-09-19)

### Build System

- **deps:** update FingerprintJS Pro SPA to 0.5.0 ([fff1052](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/fff1052852f5c53cb50474f9afc6a753b7162212))

## [1.1.1](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.1.0...v1.1.1) (2022-08-08)

### Bug Fixes

- remove company prefix from integrationInfo ([5ee25a2](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/5ee25a2da3e98423cf0db74ace3941fd3ab7a1c4))

### Documentation

- **README:** update logo ([bfb43a7](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/bfb43a7072b31f2f726906e83c1a94cb903842ab))

# [1.1.0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/compare/v1.0.0...v1.1.0) (2022-07-26)

### Features

- support passing "ignoreCache" to "useVisitorData" as well ([5cf0ce7](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/5cf0ce74c1a05a367a3cec98adf97ca14cbbe182))

# 1.0.0 (2022-06-30)

### Features

- Add svelte integration ([ee5bfb0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/ee5bfb0255fc7d49696c8e267ef3600736b5d736))

### Reverts

- Revert "ci: add NODE_AUTH_TOKEN" ([26889f9](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/26889f9be7f05e7de3b6933032f57ca43c992860))
- Revert "chore(release): 1.0.0-test.1 [skip ci]" ([ea82f6e](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/ea82f6ef29a3da1ee8df9e6102d7b8352e1ce2f8))
- Revert "chore(release): 1.0.0-test.1 [skip ci]" ([4e77e01](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/4e77e013d396096e327408ef088fafc85a491256))

# 1.0.0-test.1 (2022-06-27)

### Features

- Add svelte integration ([ee5bfb0](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/ee5bfb0255fc7d49696c8e267ef3600736b5d736))

### Reverts

- Revert "ci: add NODE_AUTH_TOKEN" ([26889f9](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/26889f9be7f05e7de3b6933032f57ca43c992860))
- Revert "chore(release): 1.0.0-test.1 [skip ci]" ([ea82f6e](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/ea82f6ef29a3da1ee8df9e6102d7b8352e1ce2f8))
- Revert "chore(release): 1.0.0-test.1 [skip ci]" ([4e77e01](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/commit/4e77e013d396096e327408ef088fafc85a491256))
