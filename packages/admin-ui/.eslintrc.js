
module.exports = {
  extends: ['airbnb-typescript'],
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