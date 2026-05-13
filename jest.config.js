const nextJest = require("next/jest");
const createJestConfig = nextJest({
    dir: "./",
});
const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jsdom",
    verbose: true,
    collectCoverage: false,
    moduleNameMapper: {
        nanoid: "<rootDir>/node_modules/nanoid/index.browser.cjs",
    },
    setupFiles: ["./setup.jest.ts"],
};

// we don't want to see logs while running tests, so we silent them like this.
process.env.LOG_LEVEL = "silent";

// Export as async function to handle ESM modules used by React JSON Schema Form v6.x,
// that Jest cannot parse by default. The transformIgnorePatterns tells Jest to transform these
// specific packages instead of ignoring them in node_modules.
// See https://stackoverflow.com/questions/77302954/unexpected-token-error-when-testing-react-jsonschema-form-component-with-next-js
module.exports = async () => ({
    ...(await createJestConfig(customJestConfig)()),
    transformIgnorePatterns: [
        'node_modules/(?!(@x0k/json-schema-merge|nanoid|uuid)/)',
    ]
});
