var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');
module.exports = {
    context: dirname,
    entry: {
        'batman.module': './packages/aio/src/batman.module.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/aio/",
        path: dirname + '/dist/output/aio',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map",
        chunkFilename: "[id].min.js",
        umdNamedDefine: true
    },
    externals: {
        [config.scope + '/core/core']: config.scope + '/core/core',
        [config.scope + '/components/components']: config.scope + '/components/components',
        '@angular/core': '@angular/core'
    },
    resolve: { extensions: [".ts", ".js"] },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.aio.json' }) }]
    },
    devtool: "source-map"

}