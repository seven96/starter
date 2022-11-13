const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// const { SOURCEMAP_SERVER_URL } = process.env;
const SOURCEMAP_SERVER_URL = process.env.SOURCEMAP_SERVER_URL;

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            append: `\n//# sourceMappingURL=${SOURCEMAP_SERVER_URL}[url]`,
            filename: 'sourcemap/[file].map',
        }),
    ]
});