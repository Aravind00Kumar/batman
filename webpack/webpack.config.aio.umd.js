var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');
module.exports = {
    context: dirname,
    entry: {
        module: './packages/aio/src/module.ts',
        list: './packages/aio/src/list.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/aio/",
        path: dirname + '/dist/output/aio',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js",
        umdNamedDefine: true
    },
    externals: {
        [config.scope + '/core/core']: config.scope + '/core/core',
        [config.scope + '/components/components']: config.scope + '/components/components',
        '@angular/core': '@angular/core'
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
                    configFileName: 'webpack/tsconfig.aio.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            {
                from: dirname + '/config/package.aoi.json', to: dirname + '/dist/output/aio/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/aio';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-aio');
                    package.keywords.push(config.name + '-aio');
                    return new Buffer.from(JSON.stringify(package));
                }
            },
        ], { copyUnmodified: true }),
    ]
}