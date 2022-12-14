const path = require('path');
// required plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// perform the configuration
const webpack = require('webpack');
const webpackBar = require('webpackbar');
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { envs } = require('./scripts/env');
// const { deployment } = require('./scripts/config');

// dirs
const rootDir = path.resolve(__dirname);
const sourceDir = path.resolve(rootDir, "./src");

const defaultExtensions = [".ts", ".tsx", ".js", ".jsx", ".json"];

module.exports = {
    mode: envs.isDev ? "development" : 'production',
    entry: {
        main: './src/index.tsx',
    },

    output: {
        publicPath: './',
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].[contenthash:8].js',
        assetModuleFilename: 'assets/[contenthash:8][ext][query]',
        globalObject: 'this',
    },

    // devtool: 'source-map',

    cache: {
        type: "filesystem",
        buildDependencies: {
            config: [__filename]
        }
    },

    optimization: {
        concatenateModules: true,
        minimize: true,
        runtimeChunk: "multiple",
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minChunks: 2,
            maxAsyncRequests: Infinity,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
                        // ??????.pnpm???????????????????????????
                        if (packageName?.startsWith('.pnpm') || !packageName) {
                            return "vendors";
                        }
                        return `${packageName.replace('@', '')}`;
                    }
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                    // topLevel: true,
                    ie8: true,
                    safari10: true,
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ]
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
                use: [
                    "cache-loader",
                    "thread-loader",
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
            },
            {
                test: [/\.gif$/, /\.png$/, /\.jpe?g$/, /\.bpm$/, /\.webm$/, /\.svg/],
                type: "asset",
                use: ["cache-loader"],
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: "static/images/[name].[contenthash:8][ext][query]"
                }
            },
            {
                test: /\.(eot|ttf|mp3|mp4|map3|map4|avi|woff2?)$/,
                type: "asset/resource",
                use: [
                    "cache-loader"
                ],
                generator: {
                    filename: "static/media/[name].[contenthash:8][ext][query]"
                }
            },
            // styles
            {
                test: /\.css$/,
                use: [
                    "cache-loader",
                    MiniCssExtractPlugin.loader,
                    "thread-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            import: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env', 'autoprefixer'],
                            },
                        },
                    }]
            },
            {
                test: /\.less$/,
                use: [
                    "cache-loader",
                    MiniCssExtractPlugin.loader,
                    "thread-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            import: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env', 'autoprefixer'],
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(sourceDir, 'styles/variables.less'),
                                path.resolve(sourceDir, 'styles/mixins.less'),
                            ],
                            injector: 'append'
                        }
                    }],
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
            'NODE_ENV': process.env.NODE_ENV,
        }),
        // new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),

        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:8].css',
            chunkFilename: 'styles/[id].[contenthash:8].css',
            linkType: 'text/css'
        }),
        // new webpack.SourceMapDevToolPlugin({
        //     append: `\n//# sourceMappingURL=${deployment.sourceMap.host}[url]`,
        //     filename: 'sourcemap/[file].map',
        // }),
        new webpackBar({ name: 'Webpack', color: 'green' }),
        new ForkTSCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(rootDir, "./tsconfig.json")
            }
        }),
        // https://www.npmjs.com/package/clean-webpack-plugin
        new CleanWebpackPlugin({ verbose: true}),

        // ??? react???react-dom ????????????????????????????????? bundle ???
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
        }),

        // hmr: development
        envs.isDev ? new webpack.HotModuleReplacementPlugin() : null,
        envs.isDev ? new ReactRefreshWebpackPlugin() : null,
        (envs.isProd && process.env.ANALYZE === 'enable') ? new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: process.env.OPEN_ANALYZER === 'enable',
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            generateStatsFile: true,
            statsFilename: 'analyzer.json',
        }) : null,
    ].filter(Boolean),

    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true,
        },
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        compress: true,
        port: 9000,
        open: true,
        client: {
            overlay: true,
            progress: true,
            reconnect: true,
            logging: 'error',
        },
        watchFiles: {
            paths: ['src/**/*', 'public/**/*'],
        },
    }
};