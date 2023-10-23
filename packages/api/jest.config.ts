import type {Config} from "@jest/types";

/**
 * Use jest with ts-jest to transform
 *
 * @see https://facebook.github.io/jest/docs/en/configuration.html
 */
const config: Config.InitialOptions = {
  testEnvironment: "node",
  rootDir: "src",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFiles: ["../jest.setup.ts"],
  moduleNameMapper: {
    // https://kulshekhar.github.io/ts-jest/docs/guides/esm-support
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};

export default config;