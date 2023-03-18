
module.exports = {
  extends: "./node.js",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-require-imports": "off",
  }
};