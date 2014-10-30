#!/usr/bin/env node

var program = require('commander');
var project = require('./project');

program
  .version('0.0.1')
  .command('create <dir>')
  .action(function (dir) {
    project.createAtDir(dir);
  });

program.parse(process.argv);
var abc = exports;

