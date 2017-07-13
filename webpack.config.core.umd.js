var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        core: './packages/core/src/core.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/core/",
        path: __dirname + '/dist/output/core',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js",
        umdNamedDefine: true
    },

    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({
                    configFileName: 'tsconfig.core.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: __dirname + '/build/package.core.json', to: __dirname + '/dist/output/core/package.json' }
        ], { copyUnmodified: true }),
    ]
}