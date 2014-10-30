#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var npm = require('npm');

var packagesPath = path.join(__dirname, 'packages');

// Find all of our local npm packages.
var packages = fs.readdirSync(packagesPath);

_.forEach(packages, function (packageName) {

  var packagePath = path.join(packagesPath, packageName);

  npm.load({}, function (err) {
    if (err) {
      console.log("Error loading npm: ", err);
      return;
    }

    npm.commands.link(packagePath, function (err) {
      if (err) {
        console.log("Error linking npm packge: ", err);
      }
    });

    npm.on("log", function (message) {
      // log the progress of the installation
      console.log(message);
    });
  });
});