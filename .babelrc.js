module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "last 2 versions",
                        "safari >= 7"
                    ]
                }
            }
        ],

        // https://www.babeljs.cn/docs/babel-preset-react
        [
            "@babel/preset-react",
            {
                "throwIfNamespace": true,
                "pure": true,
                "development": process.env.NODE_ENV === "development"
            }
        ],

        // https://www.babeljs.cn/docs/babel-preset-typescript
        [
            "@babel/preset-typescript",
            {
                // https://www.babeljs.cn/docs/babel-preset-typescript#istsx
                "isTSX": false,
            }
        ]
    ],

    "plugins": [
        // https://www.babeljs.cn/docs/babel-plugin-proposal-export-default-from
        "@babel/plugin-proposal-export-default-from",
        // https://www.babeljs.cn/docs/babel-plugin-proposal-decorators
        // "@babel/plugin-proposal-decorators"
    ]
}