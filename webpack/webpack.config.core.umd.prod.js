var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

let dirname = path.join(__dirname, '../');
module.exports = {
    context: dirname,
    entry: {
        core: './packages/core/src/core.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/core/",
        path: dirname + '/dist/output/core',
        filename: "[name].min.js",
        sourceMapFilename: "[name].min.js.map",
        chunkFilename: "[id].min.js",
        umdNamedDefine: true
    },

    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({
                    configFileName: 'webpack/tsconfig.core.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: dirname + '/packages/core/src/polyfills.min.js', to: dirname + '/dist/output/core/polyfills.min.js' }
        ], { copyUnmodified: true })
    ]
}