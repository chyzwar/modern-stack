
module.exports = {
  "extends": ['airbnb-typescript/base'],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "tsconfigRootDir": __dirname,
    "project": [
      "./tsconfig.json",
    ]
  },
  "env": {
    "browser": false,
    "node": true,
    "jest": true
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {}
    }
  ]
};