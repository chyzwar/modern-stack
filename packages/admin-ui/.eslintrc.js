
module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true
  },
  overrides: [
    {
      "files": ["*.js"],
      "rules": {
      }
    }
  ]
};