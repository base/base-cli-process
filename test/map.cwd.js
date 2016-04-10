'use strict';

require('mocha');
var assert = require('assert');
var cli = require('..');
var Base = require('base');
var base;

describe('.map.cwd', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
  });

  describe('argv', function() {
    it('should set a cwd on app', function(cb) {
      var count = 0;

      base.on('cwd', function(val) {
        assert.equal(val, process.cwd() + '/foo');
        count++;
      });

      base.cli.process(['--cwd=foo'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should not take action when give cwd is the same as existing', function(cb) {
      var count = 0;

      base.on('cwd', function(val) {
        count++;
      });

      base.cli.process(['--cwd=.'], function(err) {
        if (err) return cb(err);
        assert.equal(count, 0);
        cb();
      });
    });
  });

  describe('options object', function() {
    it('should set a cwd on app', function(cb) {
      var count = 0;

      base.on('cwd', function(val) {
        assert.equal(val, process.cwd() + '/foo');
        count++;
      });

      base.cli.process({cwd: 'foo'}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should not take action when give cwd is the same as existing', function(cb) {
      var count = 0;

      base.on('cwd', function(val) {
        count++;
      });

      base.cli.process({cwd: process.cwd()}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 0);
        cb();
      });
    });
  });
});
