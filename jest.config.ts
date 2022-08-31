module.exports = {
  // globalSetup: "./setup",
  // globalTeardown: "./teardown.js",
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  preset: "ts-jest",
};
