
module.exports = {
  extends: "@project/eslint-config",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: [
      "./tsconfig.eslint.json",
      "./packages/*/tsconfig.json",
      "./clients/*/tsconfig.json",
      "./services/*/tsconfig.json",
    ],
    tsconfigRootDir: __dirname,
  },
};