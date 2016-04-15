'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
require('helper-example');
require('helper-coverage');
var assemble = require('assemble-core');
var cli = require('..');
var app;

describe('.map.asyncHelpers (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(cli());
  });

  it('should error when app.asyncHelpers is not a function', function(cb) {
    app.cli.process({
      asyncHelpers: {
        lower: function() {},
        upper: function() {}
      }
    }, function(err) {
      assert.equal(err.message, 'expected app.asyncHelper to be a function');
      cb();
    });
  });
});

describe('.map.asyncHelpers', function() {
  beforeEach(function() {
    app = assemble();
    app.use(cli());
  });

  describe('async helpers', function() {
    it('should not choke on an empty object', function(cb) {
      app.cli.process({asyncHelpers: {}}, cb);
    });

    it('should register a glob of async helpers', function(cb) {
      app.cli.process(['--asyncHelpers="test/fixtures/helpers/*.js"'], function(err, config) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an object of helpers by filepaths', function(cb) {
      var cli = {
        asyncHelpers: {
          lower: './test/fixtures/helpers/lower.js',
          upper: './test/fixtures/helpers/upper.js'
        }
      };

      app.cli.process(cli, function(err, config) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helpers by filepaths', function(cb) {
      var cli = {
        asyncHelpers: ['./test/fixtures/helpers/lower.js', './test/fixtures/helpers/upper.js']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helper modules', function(cb) {
      var cli = {
        asyncHelpers: ['helper-coverage', 'helper-example']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('example'));
        assert(app._.helpers.async.hasOwnProperty('coverage'));
        cb();
      });
    });

    it('should register a glob of helpers', function(cb) {
      var cli = {
        asyncHelpers: ['./test/fixtures/helpers/*.js']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });
  });
});
