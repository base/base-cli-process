'use strict';

require('mocha');
var assert = require('assert');
var cli = require('..');
var Base = require('base');
var base;

describe('.map.toc', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
  });

  describe('argv', function() {
    it('should convert boolean to an object', function(cb) {
      base.cli.process(['--toc'], function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc.render, true);
        cb();
      });
    });

    it('should convert {toc: "render"} to {toc: {render: true}}', function(cb) {
      base.cli.process(['--toc=render'], function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc.render, true);
        cb();
      });
    });

    it('should expand an object', function(cb) {
      base.cli.process(['--toc=render:true'], function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc.render, true);
        cb();
      });
    });
  });

  describe('options object', function() {
    it('should convert boolean to an object', function(cb) {
      base.cli.process({toc: true}, function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc.render, true);
        cb();
      });
    });

    it('should support toc object', function(cb) {
      base.cli.process({toc: {render: true}}, function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc.render, true);
        cb();
      });
    });
  });
});
