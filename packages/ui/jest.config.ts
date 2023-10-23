import type {Config} from "@jest/types";

/**
 * Use jest with ts-jest to transform
 *
 * @see https://facebook.github.io/jest/docs/en/configuration.html
 */
const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  rootDir: "src",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  setupFilesAfterEnv: ["../jest.setup.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};

export default config;