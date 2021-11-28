
module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript'
  ],
  rules: {
    "react/react-in-jsx-scope": 'off',
    "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
    "arrow-body-style": ["off"]
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true
  },
  ignorePatterns: ["jest.config.ts","jest.setup.ts", "webpack.dev.ts", "webpack.prod.ts"],
  overrides: [
    {
      "files": ["*.js"],
      "rules": {
      }
    }
  ]
};