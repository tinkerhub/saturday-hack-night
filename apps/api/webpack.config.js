const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/platform-express',
    '@fastify/view',
    'class-transformer/storage', // https://github.com/nestjs/mapped-types/issues/486#issuecomment-932715880
];
module.exports = function (options, webpack) {
    return {
        ...options,
        externals: [],
        output: {
            ...options.output,
            libraryTarget: 'commonjs2',
        },
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
                    { from: '../../node_modules/prisma/libquery_engine-*', to: '[name][ext]' },
                ],
            }),
            new webpack.IgnorePlugin({
                checkResource(resource) {
                    if (lazyImports.includes(resource)) {
                        try {
                            require.resolve(resource);
                        } catch (err) {
                            return true;
                        }
                    }
                    return false;
                },
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_classnames: true,
                    },
                }),
            ],
        },
    };
};
