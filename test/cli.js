'use strict';

require('mocha');
var assert = require('assert');
var config = require('base-config-process');
var Base = require('base');
var cli = require('..');
var base;

describe('plugin', function() {
  it('should not register the plugin when `app.isApp` is undefined', function() {
    base = new Base();
    base.use(cli());
    assert(!base.registered.hasOwnProperty('base-cli-process'));
  });

  it('should only register the plugin once', function(cb) {
    base = new Base();
    base.isApp = true;
    base.registered = {};

    var count = 0;
    base.on('plugin', function(name) {
      if (name === 'base-cli-process') {
        count++;
      }
    });

    base.use(cli());
    base.use(cli());
    base.use(cli());
    base.use(cli());
    base.use(cli());
    assert.equal(count, 1);
    cb();
  });

  it('should not overwrite an existing base-CONFIG-process', function(cb) {
    base = new Base();
    base.isApp = true;
    base.use(config());
    var count = 0;

    base.config.map('foo', function(val, key, config, next) {
      count++;
      next();
    });

    base.use(cli());

    base.config.process({foo: 'bar'}, function(err) {
      if (err) return cb(err);
      assert.equal(count, 1);
      cb();
    });
  });
});
