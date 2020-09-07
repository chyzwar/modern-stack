
module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off"
  },
  overrides: [
    {
      "files": ["*.js"],
      "rules": {
      }
    }
  ]
};