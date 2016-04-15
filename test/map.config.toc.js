'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var data = require('base-data');
var Base = require('base');
var del = require('delete');
var cli = require('..');
var getConfig;
var base;

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

describe('.map.config.toc', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.cwd = fixtures();
    base.use(cli());
    base.pkg.set(pkgTmpl);
    base.pkg.save();
  });

  afterEach(function(cb) {
    del(pkgPath, function(err) {
      if (err) return cb(err);
      base.pkg.data = {};
      cb();
    });
  });

  after(function() {
    base.cwd = cwd;
  });

  describe('argv --config.toc', function() {
    it('should set a toc boolean defined as a sub-prop on package.json config', function(cb) {
      base.cli.process(['--config.toc'], function(err, config) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'toc']), true);
        cb();
      });
    });

    it('should set a toc boolean defined as a value on package.json config', function(cb) {
      base.cli.process(['--config=toc'], function(err, config) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'toc']), true);
        cb();
      });
    });

    it('should set a toc object', function(cb) {
      base.cli.process(['--config=toc:render'], function(err, config) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'toc']), true);
        cb();
      });
    });
  });
});
