module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json"
    }
}
