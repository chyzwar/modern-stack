const findUp = require("find-up");
const eslint = require("./rules/eslint");
const jest = require("./rules/jest");
const typescript = require("./rules/typescript");
const esm = require("./rules/esm");

module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": [
      "./tsconfig.json",
      findUp.sync("tsconfig.eslint.json"),
    ],
  },
  "env": {
    "browser": false,
    "node": true,
    "jest": true,
  },
  "globals": {
    "globalThis": true,
  },
  "plugins": [
    "@typescript-eslint",
    "jest",
    "react-hooks",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/all",
    "plugin:react-hooks/recommended",
  ],
  "rules": {
    ...eslint,
    ...jest,
    ...typescript,
    ...esm,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/no-unsafe-call": ["off"],
        "@typescript-eslint/no-unsafe-member-access": ["off"],
        "@typescript-eslint/no-unsafe-return": ["off"],
        "@typescript-eslint/no-unsafe-assignment": ["off"],
        "@typescript-eslint/no-unnecessary-condition": ["off"],
      },
    },
  ],
};