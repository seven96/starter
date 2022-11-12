const path = require('path');
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require("./webpack.common.js");

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

module.exports = merge(common, {
    mode: "development",
    devServer: {
        devMiddleware: {
            writeToDisk: true,
        },
        static: {
            directory: distDir,
        },
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 9000,
        open: true,
        client: {
            overlay: true,
            progress: true,
            reconnect: true,
            logging: 'info',
        },
        watchFiles: {
            paths: ['src/**/*', 'public/**/*'],
        },
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ]
});
