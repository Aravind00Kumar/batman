var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./config/global');

module.exports = {
    context: __dirname,
    entry: {
        [config.name]: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'var',
        library: config.libraryName,
        path: __dirname + '/dist/scripts/',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'tsconfig.single.json' }) }]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: __dirname + '/node_modules/' + config.scope + '/core/polyfills.min.js', to: __dirname + '/dist/scripts/' + config.name + '-polyfills.min.js' }
        ], { copyUnmodified: true }),
    ]
}