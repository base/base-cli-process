'use strict';

require('mocha');
var assert = require('assert');
var cli = require('base-cli');
var Schema = require('map-schema');
var schema = require('..');
var Base = require('base');
var base;

describe('options.omit', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(schema());
  });

  it('should omit the give key from the result', function(cb) {
    base = new Base();
    base.isApp = true;
    base.use(schema({omit: 'toc'}));
    base.cli.map('toc', function(val, key, config, next) {
      config[key] = 'foo';
      next();
    });

    base.cli.process({toc: true}, function(err, config) {
      if (err) return cb(err);
      assert.equal(typeof config.toc, 'undefined');
      cb();
    });
  });

  it('should omit the give key from the result when defined on options', function(cb) {
    base.option('schema.omit', 'toc');
    base.cli.map('toc', function(val, key, config, next) {
      config[key] = 'foo';
      next();
    });

    base.cli.process({toc: true}, function(err, config) {
      if (err) return cb(err);
      assert.equal(typeof config.toc, 'undefined');
      cb();
    });
  });
});

describe('.cli.schema', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
    base.use(schema());
  });

  describe('schema', function() {
    it('should use a custom schema', function(cb) {
      base.cli.schema = new Schema();
      base.cli.map('toc', function(val, key, config, next) {
        config[key] = 'foo';
        next();
      });

      base.cli.process({toc: true}, function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc, 'foo');
        cb();
      });
    });

    it('should handle errors', function(cb) {
      base.cli.map('whatever', function(val, key, config, next) {
        next(new Error('foo'));
      });

      base.cli.process({whatever: true}, function(err, config) {
        assert.equal(err.message, 'foo');
        cb();
      });
    });
  });
});
