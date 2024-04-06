/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [".eslintrc.cjs"],
  extends: ["@rpc-like-axios/eslint-config/eslintrc.react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
