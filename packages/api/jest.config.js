
module.exports = {
  testEnvironment: "node",
  rootDir: 'src',
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFiles: ['../jest.setup.js'],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "json",
    "js",
    "jsx",
  ],
};

