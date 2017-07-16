var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        // application entry point
        core: ['./node_modules/' + config.scope + '/core/core.js'],
        doughnut: './packages/components/src/doughnut/doughnut.ts',
        list: './packages/components/src/list/list.ts',
        tree: './packages/components/src/tree/optimal-tree.ts'
    },
    output: {
        libraryTarget: 'var',
        library: config.libraryName,
        path: dirname + '/dist/scripts/' + config.name + '/',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.multi.json' }) }]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: 'core',
            minChunks: Infinity
        }),
        new CopyWebpackPlugin([
            { from: dirname + '/node_modules/' + config.scope + '/core/polyfills.js', to: dirname + '/dist/scripts/' + config.name + '/polyfills.js' }
        ], { copyUnmodified: true }),

    ]
}