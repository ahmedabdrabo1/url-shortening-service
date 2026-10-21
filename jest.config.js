
const config = {
  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "mjs",
    "cjs",
    "json",
    "node",
  ],

  testMatch: ["<rootDir>/tests/**/*.test.ts"],

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};

export default config;
