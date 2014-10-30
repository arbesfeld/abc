var project = exports;

var fs = require('fs');
var path = require('path');
var examples = require('abc-examples');
var jf = require('jsonfile');
var npm = require('npm');
var _ = require('lodash');
var packages = require('./packages.js');

var allPackages = packages.allPackages();

project.createAtDir = function (projectDir) {
  // Make path absolute.
  projectDir = path.join(process.cwd(), projectDir);

  examples.create({
    dir: projectDir
  });

  var packagePath = path.join(projectDir, 'package.json');
  var projectName = path.basename(projectDir);

  var packageJson = jf.readFileSync(packagePath);
  packageJson.name = projectName;

  var inCheckout = true; // XXX todo: fix this if not running from a checkout
  if (inCheckout) {
    // If we are in checkout, use the local version of the packages instead.
    // XXX need a way to make sure that distributions have the correct published versions.
    _.map(packageJson.dependencies, function (version, name) {
      if (allPackages[name]) {
        packageJson.dependencies[name] = allPackages[name];
      }
    });
    packageJson.dependencies['abc-package'] = allPackages['abc-package'];
  }
  jf.writeFileSync(packagePath, packageJson);

  npm.load({ prefix: projectDir }, function (err, npm) {
    // Use the npm object, now that it's loaded.
    if (err) {
      console.log('Error loading npm: ', err);
    }

    npm.commands.install(function (err) {
      if (err) {
        console.log('Error installing npm project: ', err);
      }
    });
  });
};