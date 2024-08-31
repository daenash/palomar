/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  extends: ['@palomar/eslint-config/eslintrc'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
