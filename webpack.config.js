const path = require('path');
// required plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

// perform the configuration
const webpack = require('webpack');
const webpackBar = require('webpackbar');
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const { envs } = require('./scripts/env');

// dirs
const rootDir = path.resolve(__dirname);
const sourceDir = path.resolve(rootDir, "./src");

const defaultExtensions = [".ts", ".tsx", ".js", ".jsx", ".json"];

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.tsx',
    },

    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
    },

    devtool: 'source-map',

    cache: {
        type: "filesystem",
        buildDependencies: {
            config: [__filename]
        }
    },
    optimization: {
        minimize: true,
        runtimeChunk: "multiple",
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: Infinity,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `${packageName.replace('@', '')}`;
                    }
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

    resolve: {
        extensions: [...defaultExtensions],
        alias: {
            "@": sourceDir,
            "@components": path.resolve(sourceDir, "components"),
            "@hooks": path.resolve(sourceDir, "hooks"),
            "@utils": path.resolve(sourceDir, "hooks"),
            "@services": path.resolve(sourceDir, "utils")
        },
        // https://webpack.docschina.org/configuration/resolve/#resolvesymlinks
        symlinks: false,
    },

    module: {
        rules: [
            {
                // XXX: use eslint-loader to build source code
                // https://github.com/privatenumber/esbuild-loader
                test: /\.(tsx?|m?js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                }
            },
            {
                test: [/\.gif$/, /\.png$/, /\.jpe?g$/, /\.bpm$/, /\.webm$/],
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff2?)$/,
                type: "asset/resource"
            }
        ]
    },

    plugins: [
        new webpack.ids.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
            },
        }),

        // define environment variables
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        // hmr: development
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),

        // progress bar
        new webpackBar({
            name: 'Webpack',
            color: 'green'
        }),
        new ForkTSCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(rootDir, "./tsconfig.json")
            }
        }),
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: true,
        }),

        // 将 react、react-dom 作为外部依赖，不打包到 bundle 中
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                },
            ]
        })
    ]
};