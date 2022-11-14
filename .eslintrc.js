module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    env: {
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals"],
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "max-len": [2, {"code": 120}],
        "quotes": [2, "double"],
        "indent": [2, 4]
    }
};