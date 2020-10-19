/* @ts-check 
--BlueBird Promise
Promise.map(
    Iterable<any>|Promise<Iterable<any>> input,
    function(any item, int index, int length) mapper,
    [Object {concurrency: int=Infinity} options]
) -> Promise

*/
'use strict';
const Promise = require("bluebird");

class Cloner {
  constructor({ fileOps },concurrency=4) {
    this.fileOps = fileOps;
    this.concurrency=concurrency;
  }

  _cloneDirectory(dirPath) {
    return this.fileOps.createDirectoryAsync(dirPath);
  }

  _cloneFile(filePath) {
    return this.fileOps.getWriteStream(filePath);
  }

  cloneDirectories(dirPaths) {
   // return Promise.all(dirPaths.map(dirPath => this._cloneDirectory(dirPath)));
    return Promise.map(dirPaths.map(dirPath => this._cloneDirectory(dirPath)),
    {concurrency: this.concurrency});
  }

  cloneFiles(filePaths) {
    //return Promise.all(filePaths.map(filePath => this._cloneFile(filePath)));
    return Promise.map(filePaths.map(filePath => this._cloneFile(filePath)),
    {concurrency: this.concurrency});
  }

  cloneS3Bucket(bucketPath) {
    return this.fileOps.createDirectoryAsync(bucketPath);
  }
}

module.exports = Cloner;
