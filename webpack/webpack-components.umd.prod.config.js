var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');
module.exports = {
    context: dirname,
    entry: {
        components: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/components/",
        path: dirname + '/dist/output/components',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map",
        chunkFilename: "[id].min.js",
        umdNamedDefine: true
    },
    externals: {
        [config.scope + '/core/core']: config.scope + '/core/core',
        //enable it for CORE_DEBUG
        ['./../libs']: 'Batman.core'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.components.json' }) }]
    },
    devtool: "source-map"
}