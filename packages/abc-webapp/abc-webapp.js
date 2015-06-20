#!/usr/bin/env node

var Package = require('abc-package');
var grunt = require('grunt');
require('./Gruntfile.js')(grunt);

Package.onRun(function (manager) {
  grunt.tasks(['express']);
});
