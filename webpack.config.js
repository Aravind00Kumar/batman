module.exports = {
    // the base directory for resolving the entry option
    context: __dirname,
    entry:{
        // application entry point
        app:'./demo/index.js',
        // components entry point
        batman:'./src/components.ts'
    },
    output:{
        path: __dirname + '/demo/scripts',
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].bundle.js.map",
        chunkFilename: "[id].bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts",".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    },
    devtool: "source-map"
}