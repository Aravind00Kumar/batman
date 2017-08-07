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
        libraryTarget: 'umd',
        publicPath: "/dist/output/core/",
        path: dirname + '/dist/output/core',
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
            {
                from: dirname + '/config/package-core.umd.json', to: dirname + '/dist/output/core/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/core';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-core');
                    package.keywords.push(config.name + '-core');
                    return new Buffer.from(JSON.stringify(package));
                }
            },
            { from: dirname + '/packages/core/src/polyfills.js', to: dirname + '/dist/output/core/polyfills.js' }
        ], { copyUnmodified: true }),
    ]
}