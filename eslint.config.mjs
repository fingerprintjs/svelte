import { defineConfig, includeIgnoreFile } from 'eslint/config'
import dxTeamConfig from '@fingerprintjs/eslint-config-dx-team'
import svelte from 'eslint-plugin-svelte'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'node:url'
import svelteConfig from './svelte.config.js'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  {
    ignores: ['**/dist/**', '**/build/**', '**/.svelte-kit/**', '**/*.d.ts', '__tests__/smoke/**'],
  },
  {
    extends: [dxTeamConfig],
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
])
