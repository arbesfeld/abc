#!/usr/bin/env node

var rimraf = require('rimraf').sync;

// Clear the examples folder so that they are rebuilt.
rimraf('node_modules/examples');
