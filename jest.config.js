module.exports = {
  testEnvironment: "node",
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["src/**/*.js", "!src/server.js"],
  coverageReporters: ["text", "cobertura", "html"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: ".",
        outputName: "junit.xml",
        classNameTemplate: "{filepath}",
        titleTemplate: "{title}",
      },
    ],
  ],
};
