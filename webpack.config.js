var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    // the base directory for resolving the entry option
    context: __dirname,
    entry: {
        // application entry point
        batman: './src/components.ts'
    },
    output: {
        libraryTarget: 'var',
        library: 'Batman',
        path: __dirname + '/demo/scripts',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: __dirname + '/demo/css/batman.css', to: __dirname + '/dist/css/batman.css' },
            { from: __dirname + '/demo/scripts/batman-polifills.js', to: __dirname + '/dist/scripts/batman-polifills.js' },
            { from: __dirname + '/demo/scripts/batman.js', to: __dirname + '/dist/scripts/batman.js' }
        ], { copyUnmodified: true })
    ]
}