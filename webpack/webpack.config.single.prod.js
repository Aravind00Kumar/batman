var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        [config.name]: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'var',
        library: config.libraryName,
        path: dirname + '/dist/scripts/',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.single.json' }) }]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: dirname + '/node_modules/' + config.scope + '/core/polyfills.min.js', to: dirname + '/dist/scripts/' + config.name + '-polyfills.min.js' }
        ], { copyUnmodified: true }),
    ]
}