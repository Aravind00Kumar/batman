var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./config/global');

module.exports = {
    context: __dirname,
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
        path: __dirname + '/dist/scripts/' + config.name + '/',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map",
        chunkFilename: "[id].min.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'tsconfig.multi.json' }) }]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: 'core',
            minChunks: Infinity
        }),
        new CopyWebpackPlugin([
            { from: __dirname + '/node_modules/' + config.scope + '/core/polyfills.min.js', to: __dirname + '/dist/scripts/' + config.name + '/polyfills.min.js' }
        ], { copyUnmodified: true }),

    ]
}