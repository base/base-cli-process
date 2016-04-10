'use strict';

require('mocha');
var assert = require('assert');
var data = require('base-data');
var Base = require('base');
var cli = require('..');
var base;

describe('.map.data', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
  });

  describe('argv', function() {
    it('should merge data onto app.cache.data using app.data()', function(cb) {
      base.use(data());
      base.cli.process(['--data=a:b'], function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.data.a, 'b');
        cb();
      });
    });

    it('should merge data onto app.cache.data directly', function(cb) {
      base.cli.process(['--data=a:b'], function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.data.a, 'b');
        cb();
      });
    });

    it('should emit `data`', function(cb) {
      base.on('data', function(key, val) {
        assert.equal(key, 'a');
        assert.equal(val, 'b');
        cb();
      });

      base.cli.process(['--data=a:b'], function(err) {
        if (err) return cb(err);
      });
    });
  });

  describe('data object', function() {
    it('should merge data onto app.cache.data using app.data()', function(cb) {
      base.use(data());
      base.cli.process({data: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.data.a, 'b');
        cb();
      });
    });

    it('should merge data onto app.cache.data', function(cb) {
      base.cli.process({data: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.data.a, 'b');
        cb();
      });
    });

    it('should emit `data`', function(cb) {
      base.on('data', function(key, val) {
        assert.equal(key, 'a');
        assert.equal(val, 'b');
        cb();
      });

      base.cli.process({data: {a: 'b'}}, function(err) {
        if (err) return cb(err);
      });
    });
  });
});
