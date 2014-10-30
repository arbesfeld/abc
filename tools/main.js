#!/usr/bin/env node

var program = require('commander').version('0.0.1');
var project = require('./project');
var Future = require('fibers/future');
var Fiber = require('fibers');
var abcPackage = require('abc-package');

var execFileSync = function (file, args, opts) {
  var future = new Future;

  var child_process = require('child_process');
  var eachline = require('eachline');

  if (opts && opts.pipeOutput) {
    var p = child_process.spawn(file, args, opts);

    eachline(p.stdout, fiberHelpers.bindEnvironment(function (line) {
      process.stdout.write(line + '\n');
    }));

    eachline(p.stderr, fiberHelpers.bindEnvironment(function (line) {
      process.stderr.write(line + '\n');
    }));

    p.on('exit', function (code) {
      future.return(code);
    });

    return {
      success: !future.wait(),
      stdout: "",
      stderr: ""
    };
  }

  child_process.execFile(file, args, opts, function (err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
    future.return({
      success: ! err,
      stdout: stdout,
      stderr: stderr
    });
  });

  return future.wait();
};

// Creation

program
  .command('create <dir>')
  .action(function (dir) {
    Fiber(function () {
      project.createAtDir(dir);
    }).run();
  });

// Running

var run = function () {
  Fiber(function (){
    execFileSync('node', ['index.js']);
  }).run();
};

program
  .command('run')
  .action(run);

program.parse(process.argv);

