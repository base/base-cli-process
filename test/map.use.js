'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var assemble = require('assemble-core');
var cli = require('..');
var app;

describe('.map.use', function() {
  beforeEach(function() {
    app = assemble();
    app.use(cli());
    app.cwd = path.resolve(__dirname, 'fixtures/use');
  });

  describe('use', function() {
    it('should use a plugin', function(cb) {
      var arr = [];

      app.on('test', function(val) {
        arr.push(val);
      });

      app.cli.process({use: 'aaa'}, function(err, config) {
        if (err) return cb(err);
        assert.equal(arr.length, 1);
        assert.equal(arr[0], 'AAA');
        cb();
      });
    });

    it('should use an array of plugins', function(cb) {
      var arr = [];
      app.on('test', function(val) {
        arr.push(val);
      });

      app.cli.process({use: 'aaa,bbb'}, function(err, config) {
        if (err) return cb(err);
        assert.equal(arr.length, 2);
        assert.equal(arr[0], 'AAA');
        assert.equal(arr[1], 'BBB');
        cb();
      });
    });

    it('should use a plugin from a cwd', function(cb) {
      var arr = [];
      app.on('test', function(val) {
        arr.push(val);
      });

      app.cli.process({
        cwd: 'test/fixtures/use',
        use: 'aaa'
      }, function(err) {
        if (err) return cb(err);
        assert.equal(arr.length, 1);
        assert.equal(arr[0], 'AAA');
        cb();
      });
    });

    it('should use an array of plugins from a cwd passed on config', function(cb) {
      var arr = [];

      // test plugins emit `test`
      app.on('test', function(key) {
        arr.push(key);
      });

      app.cli.process({
        cwd: path.resolve(__dirname, 'fixtures/use/cwd'),
        use: 'ccc'
      }, function(err) {
        if (err) return cb(err);
        assert.equal(arr.length, 1);
        assert.equal(arr[0], 'CCC');
        cb();
      });
    });
  });
});
