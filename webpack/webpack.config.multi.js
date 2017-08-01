var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');

module.exports = {
    context: dirname,
    entry: {
        // application entry point
        core: ['./packages/components/node_modules/' + config.scope + '/core/core.js'],
        doughnut: './packages/components/src/doughnut/doughnut.ts',
        list: './packages/components/src/list/list.ts',
        tree: './packages/components/src/tree/optimal-tree.ts'
    },
    output: {
        libraryTarget: 'var',
        library: config.libraryName,
        path: dirname + '/dist/output/es5-components/',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js"
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
        new webpack.optimize.CommonsChunkPlugin({
            names: 'core',
            minChunks: Infinity
        }),
        new CopyWebpackPlugin([
            { from: dirname + '/packages/components/node_modules/' + config.scope + '/core/polyfills.js', to: dirname + '/dist/output/es5-components/polyfills.js' },
            {
                from: dirname + '/config/package.es5.components.json', to: dirname + '/dist/output/es5-components/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/es5-components';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-es5-components');
                    package.keywords.push(config.name + '-es5-components');
                    return new Buffer.from(JSON.stringify(package));
                }
            }
        ], { copyUnmodified: true }),

    ]
}