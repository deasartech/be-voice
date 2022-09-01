module.exports = {
  // globalSetup: "./setup",
  globalTeardown: "./test-teardown-globals.ts",
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  preset: "ts-jest",
};
