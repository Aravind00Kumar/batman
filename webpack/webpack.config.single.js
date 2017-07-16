var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/global');
var path = require('path');

let dirname = path.join(__dirname, '../');
module.exports = {
    context: dirname,
    entry: {
        [config.name]: './packages/components/src/components.ts'
    },
    output: {
        libraryTarget: 'var',
        library: config.libraryName,
        path: dirname + '/dist/output/es5/',
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
                    configFileName: 'webpack/tsconfig.single.json'
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: dirname + '/node_modules/' + config.scope + '/core/polyfills.js', to: dirname + '/dist/output/es5/' + config.name + '-polyfills.js' },
            {
                from: dirname + '/config/package.es5.json', to: dirname + '/dist/output/es5/package.json',
                transform: function (content, path) {
                    var package = JSON.parse(content.toString());;
                    package.name = config.scope + '/es5';
                    package.version = config.version;
                    package.author = config.author;
                    package.license = config.license;
                    package.keywords = config.keywords;
                    package.keywords.push(config.scope + '-es5');
                    package.keywords.push(config.name + '-es5');
                    return new Buffer.from(JSON.stringify(package));
                }
            },
        ], { copyUnmodified: true }),
    ]
}