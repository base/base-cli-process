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

describe('.map.config.tasks', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
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

  describe('argv --config.tasks', function() {
    it('should set a task on package.json config', function(cb) {
      base.cli.process(['--config.tasks=foo'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'tasks']), ['foo']);
        cb();
      });
    });

    it('should union a string with existing tasks', function(cb) {
      base.pkg.set([base._name, 'tasks'], ['foo']);

      base.cli.process(['--config.tasks=bar'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'tasks']), ['foo', 'bar']);
        cb();
      });
    });

    it('should union an array with existing tasks', function(cb) {
      base.pkg.set([base._name, 'tasks'], ['foo']);

      base.cli.process(['--config.tasks=bar,baz'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'tasks']), ['foo', 'bar', 'baz']);
        cb();
      });
    });
  });

  describe('options object --config.tasks', function() {
    it('should set a task on package.json config', function(cb) {
      base.cli.process({config: {tasks: 'foo'}}, function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'tasks']), ['foo']);
        cb();
      });
    });
  });
});
