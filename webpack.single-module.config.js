var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        batman: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'var',
        library: 'Batman',
        path: __dirname + '/demo/scripts/',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({
                    configFileName: 'tsconfig.es5.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: __dirname + '/demo/css/batman.css', to: __dirname + '/dist/css/batman.css' },
            { from: __dirname + '/demo/scripts/batman.js', to: __dirname + '/dist/scripts/batman.js' },
            { from: __dirname + '/src/batman-polifills.js', to: __dirname + '/demo/scripts/batman-polifills.js' },
            { from: __dirname + '/src/batman-polifills.js', to: __dirname + '/dist/scripts/batman-polifills.js' }
        ], { copyUnmodified: true }),
    ]
}