var package = require('../package.json');

String.prototype.toCamelCase = function () {
    return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
};

let libraryName = package.name.split('-')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join('');

const global = {
    name: package.name,
    scope: '@' + package.name,
    version: package.version,
    libraryName: libraryName,
    keywords: package.keywords,
    author: package.author,
    license: package.license,
    short: package.short
};

module.exports = global;