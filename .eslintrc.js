module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['effector', '@typescript-eslint'],
  extends: [
    '@react-native-community',
    'plugin:effector/recommended',
    'plugin:effector/scope',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        curly: 'off',
        eqeqeq: 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks:
              '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
          },
        ],
      },
    },
  ],
};
