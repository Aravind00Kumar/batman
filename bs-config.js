module.exports = function (bs) {
    return {
        "port": 8000,
        "files": [
            "./packages/**/*.{html,htm,css,js}",
            "./public/**/*.{html,htm,css,js}",
            "./docs/**/*.{png}",
            "./documentation/**/*.{html,htm,css,js}",
            "./dist/**/*.{js}"
        ],
        "server": {
            "baseDir": "./",
            "routes": {
                "public/aio/src/": "./public/aio/src/index.html"
            }
        },
        "exclude": true,
        "excludedFileTypes": ["./packages/components/node_modules/**/*.*"]
    };
};