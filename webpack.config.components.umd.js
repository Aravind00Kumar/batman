var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./config/global');

module.exports = {
    context: __dirname,
    entry: {
        components: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'umd',
        publicPath: "/dist/output/components/",
        path: __dirname + '/dist/output/components',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: "[id].js",
        umdNamedDefine: true
    },
    externals: {
        [config.scope + '/core/core']: config.scope + '/core/core'
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
                    configFileName: 'tsconfig.components.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            {
                from: __dirname + '/build/package.components.json', to: __dirname + '/dist/output/components/package.json',
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