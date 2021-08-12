
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
  "ignorePatterns": ["jest.config.ts", "jest.setup.ts", "webpack.dev.ts", "webpack.prod.ts"],
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {}
    }
  ]
};