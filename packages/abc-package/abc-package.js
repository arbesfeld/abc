var assert = require('assert');
var _ = require('lodash');

var abcPackage = exports;

var runFuncs = [];

abcPackage.onRun = function (func) {
  assert.ok(typeof func === 'function');

  runFuncs.push(func);
};

abcPackage.run = function () {
  // Exec the onRun functions to populate the packaged objects.
  _.forEach(runFuncs, function (func) {
    func();
  });
};
