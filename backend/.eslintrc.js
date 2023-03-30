module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    es2021: true,
    'jest/globals': true,
  },
  rules: {
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_id',
        ],
      },
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  plugins: ['jest'],
};
