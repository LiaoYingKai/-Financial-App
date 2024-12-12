import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginImportSort from 'eslint-plugin-simple-import-sort'; // 插件：import 和 export 排序

export default tseslint.config({
  ignores: ['dist', 'src/components/ui'], // 忽略 src/components/ui
  extends: [
    js.configs.recommended, // 使用 ESLint 的基本推薦配置
    ...tseslint.configs.recommended, // 使用 TypeScript 的推薦配置
  ],
  files: ['**/*.{ts,tsx}'], // 僅針對 TypeScript 和 TSX 文件進行檢查
  languageOptions: {
    ecmaVersion: 2020, // 支援的 ECMAScript 版本
    globals: globals.browser, // 定義瀏覽器的全域變數，例如 `window`
  },
  plugins: {
    'react-hooks': reactHooks, // 插件：檢查 React hooks 的規範
    'react-refresh': reactRefresh, // 插件：React refresh 僅導出組件
    'simple-import-sort': eslintPluginImportSort, // 插件：函數和變數的排序
  },
  rules: {
    // React hooks 的推薦規則
    ...reactHooks.configs.recommended.rules,

    // React Refresh 規則：限制導出非組件
    'react-refresh/only-export-components': [
      'warn', // 僅發出警告
      { allowConstantExport: true }, // 允許導出常數
    ],

    // 函數與變數的排序規則
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react$', '^react-dom$'], // React 模組應放在第一組
          ['^@?\\w'], // 其他外部模組
          ['^\\.\\.'], // 相對路徑的父層模組
          ['^\\./'], // 相對路徑的當前層模組
        ],
      },
    ], // 排序 import 語句
    'simple-import-sort/exports': 'error', // 排序 export 語句
  },
});
