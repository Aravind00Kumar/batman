var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        module: './packages/ajs/src/module.ts',
        list: './packages/ajs/src/list.ts'
    },
    output: {
        libraryTarget: 'this',
        library: config.libraryName + 'AJS',
        path: dirname + '/dist/output/ajs/',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map",
        chunkFilename: "[id].min.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    externals: {
        angular: 'angular'
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.ajs.json' }) }]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: 'module',
            minChunks: Infinity
        }) ]
}