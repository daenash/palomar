/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    ignorePatterns: [".eslintrc.cjs"],
    extends: ["@express-rpc/eslint-config/eslintrc"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
  };
  