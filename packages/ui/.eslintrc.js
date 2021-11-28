
module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true
  },
  rules: {
    "react/react-in-jsx-scope": 'off',
    "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    'react/react-in-jsx-scope': 'off'
  },
  ignorePatterns: ["jest.config.ts", "jest.setup.ts","webpack.dev.ts", "webpack.prod.ts"],
  overrides: [
    {
      "files": ["*.js"],
      "rules": {}
    }
  ]
};