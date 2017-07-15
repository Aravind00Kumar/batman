var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./config/global');

module.exports = {
    context: __dirname,
    entry: {
        components: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/components/",
        path: __dirname + '/dist/output/components',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map",
        chunkFilename: "[id].min.js",
        umdNamedDefine: true
    },
    externals: {
        [config.scope + '/core/core']: config.scope + '/core/core'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'tsconfig.components.json' }) }]
    },
    devtool: "source-map"
}