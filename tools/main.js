#!/usr/bin/env node

var cli = require('cli');
var project = require('./project');

cli.parse({
  run:   [false, 'Run your app'],
  create: [false, 'Create an app']
});

cli.main(function (args, opts) {
  if (opts.run) {
    console.log('Running!');
  }

  else if (opts.create) {
    console.log('Creating');
    project.createAtDir(args[0]);
  }
});

var abc = exports;

