module.exports = {
    root: true,
    env: {
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        }
    },
    rules: {
        "react/prop-types": 0,
        "react/jsx-indent": [4, 4],
        "jsx-quotes": ["error", "prefer-double"],
        "space-before-function-paren": ["error", "never"],
        "indent": ["error", 4],
        "comma-dangle": ["error", {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
            functions: "always-multiline",
        }],
    },
    extends: [
        "standard",
        "standard-react",
    ],
}
