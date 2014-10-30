var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var packages = exports;

// Returns an object that maps package name to local path.
packages.allPackages = function () {
  var packagesDir = path.join(__dirname, '..', 'packages');
  var packageNames = fs.readdirSync(packagesDir);
  var allPackageDirs = _.map(packageNames, function (packageName) {
    return path.join(packagesDir, packageName);
  });
  return _.zipObject(packageNames, allPackageDirs);
};
