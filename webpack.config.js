// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

export default {
    entry: {
        main: './src/main.js',
        udlAi: './src/udl-ai.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: isProduction ? '/UDL/' : '/', // ⭐ 배포용은 /UDL/, 개발용은 /
        clean: true,
        library: {
            type: 'module'
        }
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        minimize: isProduction,
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true,
        },
        client: {
            overlay: true,
            progress: true,
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        watchFiles: {
            paths: ['src/**/*', 'dist/**/*'],
            options: {
                ignored: /node_modules/,
                aggregateTimeout: 300,
                poll: 1000,
            }
        }
    },
    mode: isProduction ? 'production' : 'development', // ⭐ mode 자동 설정
};
