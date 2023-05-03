const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (options, webpack) {
    return {
        ...options,
        entry: ['webpack/hot/poll?100', options.entry],
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?100'],
            }),
        ],
        plugins: [
            ...options.plugins,
            new CopyWebpackPlugin({
                patterns: [
                    '../../node_modules/swagger-ui-dist/swagger-ui.css',
                    '../../node_modules/swagger-ui-dist/swagger-ui-bundle.js',
                    '../../node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
                    '../../node_modules/swagger-ui-dist/favicon-16x16.png',
                    '../../node_modules/swagger-ui-dist/favicon-32x32.png',
                    './prisma',
                    { from: '../../node_modules/prisma/', to: '[name][ext]' },
                ],
            }),

            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
        ],
    };
};
