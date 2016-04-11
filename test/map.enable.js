'use strict';

require('mocha');
var assert = require('assert');
var cli = require('..');
var Base = require('base');
var base;

describe('.map.enable', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
  });

  describe('argv', function() {
    it('should enable an option', function(cb) {
      base.cli.process(['--enable=abc'], function(err) {
        if (err) return cb(err);
        assert.equal(base.options.abc, true);
        cb();
      });
    });
  });

  describe('options object', function() {
    it('should set a enable on app', function(cb) {
      base.cli.process({enable: 'abc'}, function(err) {
        if (err) return cb(err);
        assert.equal(base.options.abc, true);
        cb();
      });
    });
  });
});
