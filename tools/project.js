var project = exports;

var file = require('file');
var path = require('path');
var examples = require('examples');
var jf = require('jsonfile');

project.createAtDir = function (dir) {
  examples.create({
    dir: dir
  });

  var packagePath = path.join(dir, 'package.json');
  var projectName = path.basename(dir);

  var packageJson = jf.readFileSync(packagePath);
  packageJson.name = projectName;
  jf.writeFileSync(packagePath, packageJson);
};