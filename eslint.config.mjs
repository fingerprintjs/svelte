import { defineConfig, includeIgnoreFile } from 'eslint/config'
import dxTeamConfig from '@fingerprintjs/eslint-config-dx-team'
import dxTeamTypeChecked from '@fingerprintjs/eslint-config-dx-team/type-checked'
import svelte from 'eslint-plugin-svelte'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'node:url'
import svelteConfig from './svelte.config.js'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/.svelte-kit/**',
      '**/*.d.ts',
      '__tests__/smoke/**',
      '__tests__/svelte5/**',
    ],
  },
  {
    extends: [dxTeamConfig],
  },
  // Type-aware rules are scoped to the TS sources covered by the root tsconfig.
  // Unlike the React SDK — which applies the type-checked config globally and
  // opts .svelte/JS out via `disableTypeChecked` — we scope it in, because the
  // Svelte parser can't reliably build a TS program for SFCs, so `project: true`
  // must never point at them. JS is excluded too (tsconfig has `checkJs: false`).
  {
    files: ['src/**/*.ts', '__tests__/**/*.ts'],
    ignores: ['**/*.svelte.ts'],
    extends: [dxTeamTypeChecked],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  },
  ...svelte.configs.recommended,
  {
    files: [
      '**/*.svelte',
      '**/*.svelte.ts',
      '**/*.svelte.js',
      '**/*.ts',
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.mts',
      '**/*.cts',
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
        svelteConfig,
      },
    },
  },
  ...svelte.configs.prettier,
  {
    // vitest matchers such as `expect.arrayContaining` are typed as `any`, which
    // trips no-unsafe-assignment on otherwise-correct assertions. Turned off for
    // tests to match the React SDK's eslint config.
    files: ['__tests__/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
])
