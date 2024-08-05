module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-useless-escape': 'off',
    'no-continue': 'off',
    'no-loop-func': 'off',
    'no-promise-executor-return': 'off',
    "no-return-assign": 'off',
    'no-constant-condition': 'off',
    'no-promise-executor-return': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // Проверяет типы
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Указываем расширения файлов для резолвера
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
  ],
};
