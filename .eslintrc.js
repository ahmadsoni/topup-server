module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-undef': 'off',
    'no-unused-vars': 'off',
    camelcase: 'off',
    'no-use-before-define': ['error', { functions: false, classes: false }],
    'no-shadow': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-catch': 'off',
  },
};
