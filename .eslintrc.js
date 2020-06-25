
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
    ]
  },
  env: {
    "browser": false,
    "node": true,
    "jest": true
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "jest"
  ],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  overrides: [
    {
      files: ["*.js"],
      rules: {}
    }
  ]
};