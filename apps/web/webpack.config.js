const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const resposiveLoader = require('responsive-loader/sharp');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const packageJSON = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.[contenthash].js',
    },
    devServer: {
        open: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: path.resolve(__dirname, 'assets/images/favicon.svg'),
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|webp|)$/i,
                use: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            adapter: resposiveLoader,
                            sizes: [320, 640, 960, 1200, 1800, 2400],
                            placeholder: true,
                            placeholderSize: 20,
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.optimization = { splitChunks: { chunks: 'all' } };
        config.plugins.push(new CleanWebpackPlugin());
        config.plugins.push(new MiniCssExtractPlugin({ filename: 'bundle.[contenthash].css' }));
        config.plugins.push(
            new InjectManifest({
                swSrc: path.resolve(__dirname, 'src', 'sw.ts'),
                exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, /\.(jpe?g|png|webp)$/i],
                maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
            }),
        );
        config.plugins.push(
            new WebpackPwaManifest({
                name: 'Saturday HackNight',
                short_name: 'SHN',
                description: packageJSON.description,
                orientation: 'portrait',
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve(__dirname, 'assets/images/logo.png'),
                        sizes: [96, 128, 192, 256, 384, 500],
                    },
                ],
            }),
        );
    } else {
        config.mode = 'development';
    }
    return config;
};
