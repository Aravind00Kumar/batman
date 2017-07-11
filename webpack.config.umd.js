var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    // the base directory for resolving the entry option
    context: __dirname,
    entry: {
        components:'./src/components.ts'
    },
      output: {
            libraryTarget: 'umd',
            publicPath: "/@batman/",
            path: __dirname + '/@batman',
            filename: "[name].js",
            sourceMapFilename: "[name].js.map",
            chunkFilename: "[id].js",
            umdNamedDefine: true
      },
    
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.ts?$/, loader: "ts-loader?"}
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: __dirname + '/demo/css/batman.css', to: __dirname + '/@batman/css/batman.css' },
            { from: __dirname + '/src/batman-polifills.js', to: __dirname + '/@batman/batman-polifills.js' },
            { from: __dirname + '/build/package.json', to: __dirname + '/@batman/package.json' }
        ], { copyUnmodified: true }),
    ]
}