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
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var pkgPath = fixtures('package.json');
var pkgTmpl = {
  "name": "fixtures",
  "version": "0.0.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "license": "MIT"
};

describe('.map.config.helpers', function() {
  beforeEach(function(cb) {
    base = assemble();
    base.use(cli());
    base.cwd = fixtures();
    base.pkg.data = {};
    base.pkg.set(pkgTmpl);
    base.pkg.save();
    cb();
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

  describe('argv (--config.helper)', function() {
    it('should not choke on an empty value', function(cb) {
      base.cli.process(['--config.helper=""'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base._.helpers.sync, {});
        cb();
      });
    });

    it('should register an object of helpers by filepaths', function(cb) {
      base.cli.process(['--config.helpers=test/fixtures/helpers/lower.js'], function(err) {
        if (err) return cb(err);
        assert(base._.helpers.sync.hasOwnProperty('lower'));
        cb();
      });
    });

    it('should register an object of helpers with quoted filepaths', function(cb) {
      base.cli.process(['--config.helper="test/fixtures/helpers/lower.js"'], function(err) {
        if (err) return cb(err);
        assert(base._.helpers.sync.hasOwnProperty('lower'));
        cb();
      });
    });
  });

  describe('argv (--config.helpers)', function() {
    it.only('should union a string with existing helpers', function(cb) {
      base.pkg.set([base._name, 'helpers'], ['foo']);
      base.pkg.save();

      base.cli.process(['--config.helpers=bar'], function(err) {
        if (err) return cb(err);
        // assert.deepEqual(base.pkg.get([base._name, 'helpers']), ['foo', 'bar']);
        console.log(base._.helpers)
        assert(base._.helpers.sync.hasOwnProperty('foo'));
        cb();
      });
    });

    it('should union an array with existing helpers', function(cb) {
      base.pkg.set([base._name, 'helpers'], ['foo']);
      base.pkg.save();

      base.cli.process(['--config.helpers=bar,baz'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'helpers']), ['foo', 'bar', 'baz']);
        base.pkg.del([base._name, 'helpers']);
        base.pkg.save();
        cb();
      });
    });

    it('should add a glob of sync helpers to config', function(cb) {
      var args = ['--config.helpers="test/fixtures/helpers/*.js"'];

      base.cli.process(args, function(err, config) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'helpers']), ['test/fixtures/helpers/*.js']);
        assert.deepEqual(config.config.helpers, ['test/fixtures/helpers/*.js']);
        cb();
      });
    });

    it('should register an object of helpers by filepaths', function(cb) {
      base.cli.process(['--config.helpers=test/fixtures/helpers/lower.js'], function(err) {
        if (err) return cb(err);
        assert(base._.helpers.sync.hasOwnProperty('lower'));
        cb();
      });
    });

    it('should register an object of helpers with quoted filepaths', function(cb) {
      base.cli.process(['--config.helpers="test/fixtures/helpers/lower.js"'], function(err) {
        if (err) return cb(err);
        assert(base._.helpers.sync.hasOwnProperty('lower'));
        cb();
      });
    });

    it('should remove undefined values', function(cb) {
      base.cli.process(['--config.helpers=""'], function(err, config) {
        if (err) return cb(err);
        assert.equal(typeof base.pkg.get([base._name, 'helpers']), 'undefined');
        assert.deepEqual(config, {});
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
