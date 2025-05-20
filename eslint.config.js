// eslint.config.js
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      parser: 'vue-eslint-parser',     // Use Vue parser for .vue files
      parserOptions: {
        parser: '@babel/eslint-parser', // or '@typescript-eslint/parser' if TS
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs['flat/essential'].rules,  // Vue essential rules
      'no-unused-vars': 'warn',                       // unused vars as warnings
      'vue/multi-word-component-names': 'off',       // disable multi-word component name rule
    },
  },
])
