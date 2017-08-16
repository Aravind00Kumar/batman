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
        libraryTarget: 'var',
        library: [config.libraryName, '[name]'],
        path: dirname + '/dist/output/core-es5/',
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
        new CopyWebpackPlugin([
            { from: dirname + '/packages/core/src/polyfills.js', to: dirname + '/dist/output/core-es5/polyfills.js' },
            {
                from: dirname + '/config/package-core.es5.json', to: dirname + '/dist/output/core-es5/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/core-es5';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-core-core');
                    package.keywords.push(config.name + '-core-es5');
                    return new Buffer.from(JSON.stringify(package));
                }
            }
        ], { copyUnmodified: true }),
    ]
}