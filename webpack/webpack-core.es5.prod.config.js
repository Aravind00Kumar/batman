var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        core: './packages/core/src/core.ts'
    },
    output: {
        libraryTarget: 'var',
        library: [config.libraryName, '[name]'],
        path: dirname + '/dist/output/core-es5/',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.multi.json' }) }]
    },
    devtool: "source-map"
}