module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['eslint-plugin-react'],
  rules: {
    'react/prop-types': [0, {}],
    'react/no-unescaped-entities': [0, {}],
    'no-unused-vars': [1, {}]
  }
};
