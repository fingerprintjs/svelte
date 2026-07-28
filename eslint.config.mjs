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
    files: ['__tests__/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
])
