import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import eslintReact from "@eslint-react/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import stylistic from "@stylistic/eslint-plugin";

// eslint.config.js
export default [
    eslint.configs.recommended,
    eslintReact.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
        ignores: [".*/**", "**/public", "**/node_modules", "**/*.js", "**/*.generated.*"],
    },
    {
        plugins: {
            "@next/next": nextPlugin,
            "sort-destructure-keys": sortDestructureKeys,
            "@stylistic": stylistic,
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: true, // or specify path to tsconfig: "./tsconfig.json"
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // if special rules for .tsx files are needed, insert here
        },
        settings: {
            react: {
                version: "detect", // this checks which React version is used and applies the correct rules
            },
            "import/resolver": {
                typescript: {},
            },
        },
    },
    {
        files: ["**/*.d.ts"],
        rules: {
            // if special rules for .d.ts files are needed, insert here
            // we want to ignore this as it's the default way astro loads its internal types
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },
    {
        rules: {
            // Next.js rules
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,

            // Since React version 19 an explicit import of React is not needed anymore.
            // See https://kinsta.com/knowledgebase/react-must-be-in-scope-when-using-jsx/
            "@eslint-react/react-in-jsx-scope": "off",

            "@eslint-react/no-unnecessary-use-prefix": "off",
            "@eslint-react/set-state-in-effect": "off",
            "@eslint-react/dom-no-dangerously-set-innerhtml": "off",

            // basic
            "import/prefer-default-export": 0,
            "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],

            // plugin sort-destructure-keys
            "sort-destructure-keys/sort-destructure-keys": 2,

            // plugin stylistic
            "@stylistic/array-bracket-newline": ["error", { "multiline": true }],
            "@stylistic/array-bracket-spacing": ["error", "never"],
            "@stylistic/array-element-newline": ["error", { "consistent": true, "multiline": true }],
            "@stylistic/arrow-parens": ["error", "as-needed"],
            "@stylistic/arrow-spacing": ["error", { "before": true, "after": true }],
            "@stylistic/block-spacing": ["error", "always"],
            "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
            "@stylistic/computed-property-spacing": ["error", "never"],
            "@stylistic/dot-location": ["error", "property"],
            "@stylistic/eol-last": ["error", "always"],
            "@stylistic/function-call-spacing": ["error", "never"],
            "@stylistic/function-paren-newline": ["error", "multiline"],
            "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
            "@stylistic/indent": ["error", 4],
            "@stylistic/indent-binary-ops": ["error", 4],
            "@stylistic/key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
            "@stylistic/keyword-spacing": ["error", { "before": true, "after": true }],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/max-len": ["error", { code: 110, "ignoreUrls": true }],
            "@stylistic/max-statements-per-line": ["error", { "max": 1 }],
            "@stylistic/member-delimiter-style": ["error", {
                "multiline": {
                    "delimiter": "none",
                    "requireLast": false,
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false,
                },
                "multilineDetection": "brackets",
            }],
            "@stylistic/multiline-ternary": ["error", "always-multiline"],
            "@stylistic/new-parens": ["error", "never"],
            "@stylistic/no-mixed-operators": "error",
            "@stylistic/no-mixed-spaces-and-tabs": "error",
            "@stylistic/no-multi-spaces": "error",
            "@stylistic/no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 0, "maxEOF": 1 }],
            // "@stylistic/no-trailing-spaces": "error", // TODO: check with Markus, if on, it conflicts with stylelint
            "@stylistic/no-whitespace-before-property": "error",
            "@stylistic/nonblock-statement-body-position": ["error", "beside"],
            "@stylistic/object-curly-newline": ["error", { "consistent": true }],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/one-var-declaration-per-line": ["error", "initializations"],
            "@stylistic/operator-linebreak": ["error", "after"],
            "@stylistic/padded-blocks": ["error", "never"],
            "@stylistic/quote-props": ["error", "as-needed"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/rest-spread-spacing": ["error", "never"],
            "@stylistic/semi-spacing": "error",
            "@stylistic/semi-style": ["error", "last"],
            "@stylistic/space-before-blocks": "error",
            "@stylistic/space-before-function-paren": ["error", "never"],
            "@stylistic/space-in-parens": ["error", "never"],
            "@stylistic/space-infix-ops": "error",
            "@stylistic/space-unary-ops": "error",
            "@stylistic/spaced-comment": ["error", "always"],
            "@stylistic/switch-colon-spacing": ["error", { "after": true, "before": false }],
            "@stylistic/template-curly-spacing": ["error", "never"],
            "@stylistic/type-annotation-spacing": "error",
            "@stylistic/type-generic-spacing": ["error"],
            "@stylistic/type-named-tuple-spacing": ["error"],
            "@stylistic/wrap-iife": ["error", "inside"],
            "@stylistic/wrap-regex": "error",
        },
    },
];
