/* eslint-disable prettier/prettier */
module.exports = {
    transform: {
        ".ts": "ts-jest"
    },
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "json"],
    testRegex: "(/src/test/int-test/.*).ts?$",
    testTimeout: 60000
};
