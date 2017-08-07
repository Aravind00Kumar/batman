var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        doughnut: './packages/components/src/doughnut/doughnut.ts',
        list: './packages/components/src/list/list.ts',
        tree: './packages/components/src/tree/optimal-tree.ts'
    },
    output: {
        libraryTarget: 'var',
        library: [config.libraryName, '[name]'],
        path: dirname + '/dist/output/components-es5/',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js",
    },
    externals: {
        [config.scope + '/core/core']: 'Batman.core',
        //enable it for CORE_DEBUG
        ['./../libs']: 'Batman.core'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts?$/, loader: 'ts-loader?' + JSON.stringify({ configFileName: 'webpack/tsconfig.multi.json' }) }]
    },
    devtool: "source-map",
    plugins: [
        //new BundleAnalyzerPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: 'core',
        //     minChunks: Infinity
        // }),
        new CopyWebpackPlugin([
            {
                from: dirname + '/config/package-components.es5.json', to: dirname + '/dist/output/components-es5/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/components-es5';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-components-es5');
                    package.keywords.push(config.name + '-components-es5');
                    return new Buffer.from(JSON.stringify(package));
                }
            }
        ], { copyUnmodified: true }),

    ]
}