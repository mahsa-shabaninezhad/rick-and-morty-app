export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png|jpg)$": "identity-obj-proxy",
    // "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/test/__ mocks __/fileMock.js",
  },
};
