const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/main.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.(jpg|png|svg|jpeg|gif)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        // alias: {
        //     '@components': path.resolve(__dirname, 'src/app/components'),
        //     '@pages': path.resolve(__dirname, 'src/app/pages'),
        //     '@types': path.resolve(__dirname, 'src/app/types'),
        //     '@app': path.resolve(__dirname, 'src/app/'),
        //     '@data': path.resolve(__dirname, 'src/app/data'),
        // },
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: (pathData) => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath}/[name].[hash][ext][query]`;
        },
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, 'src', 'favicon.ico'),
        }),
        new EslintPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets',
                    noErrorOnMissing: true,
                },
                // { from: path.resolve(__dirname, 'src', 'favicon.ico'), to: 'favicon.ico' },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
