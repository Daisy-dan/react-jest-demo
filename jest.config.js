export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  extensionsToTreatAsEsm: [".jsx", ".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg)$": "<rootDir>/src/test/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.[tj]sx?$": [
      "babel-jest",
      {
        presets: [
          [
            "@babel/preset-env",
            { targets: { node: "current" }, modules: "auto" },
          ],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
};
