var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');
module.exports = {
    context: dirname,
    entry: {
        components: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/components/",
        path: dirname + '/dist/output/components',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js",
        umdNamedDefine: true
    },
    externals: {
        [config.scope + '/core/core']: config.scope + '/core/core',
        //enable it for CORE_DEBUG
        //['./../libs']: 'Batman.core'
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
                    configFileName: 'webpack/tsconfig.components.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            {
                from: dirname + '/config/package-components.umd.json', to: dirname + '/dist/output/components/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/components';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-components');
                    package.keywords.push(config.name + '-components');
                    return new Buffer.from(JSON.stringify(package));
                }
            },
        ], { copyUnmodified: true }),
    ]
}