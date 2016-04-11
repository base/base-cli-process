'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var data = require('base-data');
var assemble = require('assemble-core');
var del = require('delete');
var cli = require('..');
var getConfig;
var base;

var cwd = process.cwd();
var fixtures = path.resolve(__dirname, 'fixtures');
var pkgPath = path.resolve(fixtures, 'package.json');
var pkgTmpl = {
  "name": "fixtures",
  "version": "0.0.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "license": "MIT"
};

describe('.map.config.helpers', function() {
  beforeEach(function() {
    base = assemble();
    base.cwd = fixtures;
    base.use(cli());
  });

  afterEach(function(cb) {
    del(pkgPath, function(err) {
      if (err) return cb(err);

      base.pkg.set(pkgTmpl);
      cb();
    });
  });

  after(function() {
    base.cwd = cwd;
  });

  describe('argv --config.helpers', function() {
    it('should set a task on package.json config', function(cb) {
      base.cli.process(['--config.helpers=foo'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'helpers']), ['foo']);
        cb();
      });
    });

    it('should union a string with existing helpers', function(cb) {
      base.pkg.set([base._name, 'helpers'], ['foo']);

      base.cli.process(['--config.helpers=bar'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'helpers']), ['foo', 'bar']);
        cb();
      });
    });

    it('should union an array with existing helpers', function(cb) {
      base.pkg.set([base._name, 'helpers'], ['foo']);

      base.cli.process(['--config.helpers=bar,baz'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'helpers']), ['foo', 'bar', 'baz']);
        cb();
      });
    });

    it('should add a glob of sync helpers to config', function(cb) {
      base.cli.process(['--config.helpers="test/fixtures/helpers/*.js"'], function(err, config) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'helpers']), ['test/fixtures/helpers/*.js']);
        assert.deepEqual(config.config.helpers, ['test/fixtures/helpers/*.js']);
        cb();
      });
    });

    it('should remove undefined values', function(cb) {
      base.cli.process(['--config.helpers=""'], function(err, config) {
        if (err) return cb(err);
        assert.equal(typeof base.pkg.get([base._name, 'helpers']), 'undefined');
        assert.equal(typeof config.config.helpers, 'undefined');
        cb();
      });
    });
  });

  /**
   * TODO: omit function values from `config`
   */

  describe('options object --config.helpers', function() {
    it('should register an object of helper functions', function(cb) {
      var cli = {
        config: {
          helpers: {
            lower: function() {},
            upper: function() {}
          }
        }
      };

      base.cli.process(cli, function(err, config) {
        if (err) return cb(err);
        cb();
      });
    });
  });
});
