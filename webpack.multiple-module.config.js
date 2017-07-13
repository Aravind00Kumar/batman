var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        // application entry point
        core: ['./node_modules/@batman/core/core.js'],
        doughnut: './packages/components/src/doughnut/doughnut.ts',
        list: './packages/components/src/list/list.ts',
        tree: './packages/components/src/tree/optimal-tree.ts'
    },
    output: {
        libraryTarget: 'var',
        library: 'Batman',
        path: __dirname + '/demo/scripts/modules/',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({
                    configFileName: 'tsconfig.es5.multi.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: 'core',
            minChunks: Infinity
        })
    ]
}