const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { deployment } = require('./config');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            append: `\n//# sourceMappingURL=${deployment.sourceMap.host}[url]`,
            filename: 'sourcemap/[file].map',
        }),
    ]
});