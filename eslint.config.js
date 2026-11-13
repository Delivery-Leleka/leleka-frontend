import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import betterTW from 'eslint-plugin-better-tailwindcss';

export default defineConfig([
  globalIgnores(['build', 'node_modules', '.react-router']),
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      prettierRecommended,
      betterTW.configs.recommended,
    ],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/app.css',
        rootFontSize: 16,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variant-order': 'warn',
    },
  },
]);
