var assert = require('assert');
var _ = require('lodash');

var abcPackage = exports;

var runFuncs = [];

abcPackage.onRun = function (f) {
  assert.ok(typeof f === 'function');

  runFuncs.push(f);
};

abcPackage.run = function () {
  _.forEach(runFuncs, function (f) {
    f();
  });
};