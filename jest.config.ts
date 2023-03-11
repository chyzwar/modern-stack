import type {Config} from '@jest/types';

process.env.NODE_OPTIONS="--experimental-vm-modules";

const config: Config.InitialOptions = {
  verbose: false,
  maxWorkers: 8,
  projects: [
    "<rootDir>/packages/*/jest.config.ts",
  ],
};

export default config;