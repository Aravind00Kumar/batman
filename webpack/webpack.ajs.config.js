var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        module: './packages/ajs/src/module.ts',
        list: './packages/ajs/src/list.ts'
    },
    output: {
        libraryTarget: 'this',
        library: config.libraryName + 'AJS',
        path: dirname + '/dist/output/ajs/',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    externals: {
        angular: 'angular'
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.ajs.json' }) }]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: 'module',
            minChunks: Infinity
        }),
        new CopyWebpackPlugin([
            {
                from: dirname + '/config/package-ajs.json', to: dirname + '/dist/output/ajs/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/ajs';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-ajs');
                    package.keywords.push(config.name + '-ajs');
                    return new Buffer.from(JSON.stringify(package));
                }
            }
        ], { copyUnmodified: true }),

    ]
}