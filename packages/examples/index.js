#!/usr/bin/env node

var wrench = require('wrench');
var path = require('path');
var assert = require('assert');

var examples = exports;

/*
  Create an example at a directory.

  @exampleName {string} name of the example
  @dir {path} path to where the example should be copied
*/
examples.create = function (opts) {
  var dir = opts.dir;
  var exampleName = opts.exampleName || "skeleton";
  assert(dir, 'Must pass dir option to examples.create');

  wrench.mkdirSyncRecursive(dir, 0777);
  wrench.copyDirSyncRecursive(path.join(__dirname, 'example-src', exampleName),
   dir, {
    forceDelete: true, // Whether to overwrite existing directory or not
  });
};