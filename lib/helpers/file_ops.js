// @ts-check

'use strict';
const fs = require('graceful-fs');
const concurrency = parseFloat(process.argv[2] || '4' );
const { promisify } = require('util');

const mkdirPromise = promisify(fs.mkdir);

module.exports = () => ({
  createDirectoryAsync(dirPath) {
    return mkdirPromise(dirPath, {recursive: true} );
  },

  _getDirPathFromFilePath(filePath) {
    let filePathArr = filePath.split('/');
    filePathArr.pop();
    return filePathArr.join('/');
  },

  getWriteStream(filePath) {
    // extract dir path from file path.
    const dirPath = this._getDirPathFromFilePath(filePath);
    return this.createDirectoryAsync(dirPath)
      .then(() => fs.createWriteStream(filePath, { flags: 'w+' }))
      .catch(error => error);
  }
});

/*
var Promise = require("bluebird");
var join = Promise.join;
var fs = Promise.promisifyAll(require("fs"));
var concurrency = parseFloat(process.argv[2] || "Infinity");
console.time("reading files");
fs.readdirAsync(".").map(function(fileName) {
    var stat = fs.statAsync(fileName);
    var contents = fs.readFileAsync(fileName).catch(function ignore() {});
    return join(stat, contents, function(stat, contents) {
        return {
            stat: stat,
            fileName: fileName,
            contents: contents
        }
    });
// The return value of .map is a promise that is fulfilled with an array of the mapped values
// That means we only get here after all the files have been statted and their contents read
// into memory. If you need to do more operations per file, they should be chained in the map
// callback for concurrency.
}, {concurrency: concurrency}).call("sort", function(a, b) {
    return a.fileName.localeCompare(b.fileName);
}).then(function() {
    console.timeEnd("reading files");
});

*/