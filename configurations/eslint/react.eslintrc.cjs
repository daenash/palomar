/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./.eslintrc.cjs", "plugin:react/recommended"],
  plugins: ["react"],
  rules: {
    "react/self-closing-comp": "warn",
  },
};
