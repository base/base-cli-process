'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var questions = require('base-questions');
var store = require('base-store');
var Pkg = require('pkg-store');
var Base = require('base');
var del = require('delete');
var pkg = require('base-pkg');
var utils = require('../lib/utils');
var cli = require('..');
var base, pkg;

var cwd = process.cwd();
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var pkgPath = path.resolve(fixtures(), 'package.json');
var pkgTmpl = {
  "name": "fixtures",
  "version": "0.0.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "license": "MIT"
};

describe('utils', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.cwd = fixtures();
    process.chdir(fixtures());
    base.use(pkg());
  });

  afterEach(function(cb) {
    del(pkgPath, function(err) {
      if (err) return cb(err);

      base.pkg.set(pkgTmpl);
      base.pkg.save();
      cb();
    });
  });

  after(function() {
    base.cwd = cwd;
    process.chdir(cwd);
  });
});
