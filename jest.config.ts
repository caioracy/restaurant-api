module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/test"],
  testMatch: ["**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/domain/logger/**",
    "!src/infrastructure/modules/**",
    "!src/application/**",
    "!src/main.ts",
    "!src/app.module.ts",
  ],
  moduleNameMapper: {
    "^@application/(.*)$": "<rootDir>/src/application/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
  },
  testPathIgnorePatterns: [
    "/src/domain/logger/",
    "/src/infrastructure/modules",
    "/src/application/",
    "/src/main.ts",
    "/src/app.module.ts",
  ],
};
