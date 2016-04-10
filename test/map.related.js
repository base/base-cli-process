'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var cli = require('..');
var base;

describe('.map.related', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
  });

  describe('argv', function() {
    it('should move related value to related.list', function(cb) {
      base.cli.process(['--related=foo'], function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list[0], 'foo');
        cb();
      });
    });

    it('should not move related.highlght value to related.list', function(cb) {
      base.cli.process(['--related=highlight:foo'], function(err, config) {
        if (err) return cb(err);
        assert.equal(config.related.highlight, 'foo');
        cb();
      });
    });

    it('should arrayify related links', function(cb) {
      base.cli.process(['--related=foo'], function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list[0], 'foo');
        cb();
      });
    });

    it('should uniquify array elements', function(cb) {
      base.cli.process(['--related=foo,bar,foo'], function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list.length, 2);
        cb();
      });
    });
  });

  describe('options object', function() {
    it('should move related value to related.list', function(cb) {
      base.cli.process({related: 'foo'}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list[0], 'foo');
        cb();
      });
    });

    it('should arrayify related links', function(cb) {
      base.cli.process({related: 'foo'}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list[0], 'foo');
        cb();
      });
    });

    it('should uniquify array elements', function(cb) {
      base.cli.process({related: ['foo', 'bar', 'foo']}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list.length, 2);
        cb();
      });
    });
  });
});
