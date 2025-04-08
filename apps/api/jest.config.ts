import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
  },
  workerIdleMemoryLimit: "512MB",
  maxWorkers: 4,
  logHeapUsage: true,
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["dist"],
  coverageDirectory: "<rootDir>/coverage",
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testMatch: ["<rootDir>/test/**/*.test.ts"],
};

export default jestConfig;
