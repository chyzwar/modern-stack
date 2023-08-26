
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
      "./packages/*/vite.config.ts",
    ],
    tsconfigRootDir: __dirname,
  },
};