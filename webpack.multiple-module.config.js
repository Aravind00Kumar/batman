var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        // application entry point
        common:['./src/common/common.ts' ],
        doughnut: './src/components/doughnut/doughnut.ts',
        list: './src/components/list/list.ts',
        tree: './src/components/tree/optimal-tree.ts'
    },
    output: {
        libraryTarget: 'var',
        library: 'Batman',
        path: __dirname + '/demo/scripts/multiple-module/',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: __dirname + '/demo/css/batman.css', to: __dirname + '/dist/css/batman.css' },
            { from: __dirname + '/demo/scripts/batman.js', to: __dirname + '/dist/scripts/batman.js' },
            { from: __dirname + '/src/batman-polifills.js', to: __dirname + '/demo/scripts/batman-polifills.js' },
            { from: __dirname + '/src/batman-polifills.js', to: __dirname + '/dist/scripts/batman-polifills.js' }
        ], { copyUnmodified: true }),
       
        // Individual modules
        new webpack.optimize.CommonsChunkPlugin({
            names: 'common',
            minChunks: Infinity
        })
    ]
}