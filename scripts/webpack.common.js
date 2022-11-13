const path = require('path');
// required plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// perform the configuration
const webpack = require('webpack');
const webpackBar = require('webpackbar');
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const { envs } = require('./env');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// dirs
const rootDir = path.resolve(__dirname, "..");
const sourceDir = path.resolve(rootDir, "./src");
const defaultExtensions = [".ts", ".tsx", ".js", ".jsx", ".json"];

module.exports = {
    target: "web",
    entry: './src/index.tsx',
    output: {
        publicPath: './',
        path: path.resolve(rootDir, 'dist'),
        filename: 'scripts/[name].[contenthash:8].js',
        // assetModuleFilename: 'assets/[contenthash:8][ext][query]',
        globalObject: 'this',
        asyncChunks: true,
    },
    cache: {
        type: "filesystem",
        buildDependencies: {
            config: [__filename]
        }
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
        // 'react-router-dom': 'ReactRouterDOM',    
    },
    optimization: {
        usedExports: true,
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: "multiple",
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minChunks: 3,
            maxAsyncRequests: Infinity,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
                        if (packageName?.startsWith('.pnpm') || !packageName) {
                            return "vendors";
                        }
                        return `${packageName.replace('@', '')}`;
                    }
                },
                default: {
                    minChunks: 3,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    output: { comments: false },
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
        modules: [path.resolve(rootDir, "build-plugins"), "node_modules"],
        // https://webpack.docschina.org/configuration/resolve/#resolvesymlinks
        // symlinks: false,
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
                            cacheDirectory: true,
                            plugins: [envs.isDev && "react-refresh/babel"].filter(Boolean)
                        }
                    }
                ],
            },
            {
                test: [/\.gif$/, /\.png$/, /\.jpe?g$/, /\.bpm$/, /\.webm$/, /\.svg/],
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: "static/images/[name][ext][query]"
                }
            },
            {
                test: /\.(eot|ttf|mp3|mp4|map3|map4|avi|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[name][ext][query]"
                }
            },

            // styles
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]_[hash:base64:5]',
                            },
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
                test: /\.css$/,
                exclude: [/src/],
                use: [
                    "cache-loader",
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'thread-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]_[hash:base64:5]',
                            },
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
                                exclude: /node_modules/,
                                modifyVars: {
                                    'primary-color': '#1DA57A',
                                    'link-color': '#1DA57A',
                                    'border-radius-base': '2px',
                                },
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
                    }
                ],
            },
            {
                test: /\.less$/,
                exclude: [/src/],
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'thread-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
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
                                exclude: /node_modules/,
                                modifyVars: {
                                    'primary-color': '#1DA57A',
                                    'link-color': '#1DA57A',
                                    'border-radius-base': '2px',
                                },
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
                    }
                ],
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
            'process.env': JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                ...envs
            }),
        }),
        // new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:8].css',
            chunkFilename: 'styles/[id].[contenthash:8].css',
            linkType: 'text/css',
            experimentalUseImportModule: true,
            ignoreOrder: true,
        }),
        new webpackBar({ name: 'Webpack', color: 'green' }),
        new ForkTSCheckerWebpackPlugin({
            typescript: {
                configFile: path.relative(rootDir, "./tsconfig.json")
            }
        }),
        // https://www.npmjs.com/package/clean-webpack-plugin
        new CleanWebpackPlugin({ verbose: true }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(rootDir, "./public"),
                    to: path.resolve(rootDir, "./dist"),
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                },
                // {
                //     from: path.resolve(sourceDir, "./assets"),
                //     to: path.resolve(rootDir, "./dist/assets"),
                //     noErrorOnMissing: true,
                // }
            ]
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
        }),
        envs.isAnalyze && new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: process.env.OPEN_ANALYZER === 'enable',
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            generateStatsFile: true,
            statsFilename: 'analyzer.json',
        }),
        new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
        new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /antd$/ }),
    ].filter(Boolean),
};