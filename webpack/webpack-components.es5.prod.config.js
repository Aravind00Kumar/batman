var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        doughnut: './packages/components/src/doughnut/doughnut.ts',
        list: './packages/components/src/list/list.ts',
        tree: './packages/components/src/tree/optimal-tree.ts'
    },
    output: {
        libraryTarget: 'var',
        library: config.libraryName,
        path: dirname + '/dist/output/es5-components/',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map",
        chunkFilename: "[id].min.js"
    },
    externals: {
        [config.scope + '/core/core']: 'Batman.core',
        //enable it for CORE_DEBUG
        ['./../libs']: 'Batman.core'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.multi.json' }) }]
    },
    devtool: "source-map"
}