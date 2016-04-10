'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var cli = require('..');
var base;

describe('.map.reflinks', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
  });

  describe('reflinks', function() {
    it('should arrayify reflinks', function(cb) {
      base.cli.process({reflinks: 'foo'}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.reflinks));
        assert.equal(config.reflinks[0], 'foo');
        cb();
      });
    });

    it('should uniquify reflinks', function(cb) {
      base.cli.process({reflinks: ['foo', 'bar', 'foo']}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.reflinks));
        assert.equal(config.reflinks.length, 2);
        cb();
      });
    });
  });
});
