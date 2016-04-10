'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var pipeline = require('base-pipeline');
var assemble = require('assemble-core');
var cli = require('..');
var app;

describe('.map.plugins (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(cli());
  });

  it('should error when base-pipeline is not registered', function(cb) {
    app.cli.process({
      plugins: {
        lower: function() {},
        upper: function() {}
      }
    }, function(err) {
      assert.equal(err.message, 'expected base-pipeline to be registered');
      cb();
    });
  });
});

describe('.map.plugins', function() {
  beforeEach(function() {
    app = assemble();
    app.use(pipeline());
    app.use(cli());
  });

  describe('plugins', function() {
    it('should not choke on an empty object', function(cb) {
      app.cli.process({plugins: {}}, cb);
    });

    it('should register an object of plugin functions', function(cb) {
      var config = {
        plugins: {
          lower: function() {},
          upper: function() {}
        }
      };

      app.cli.process(config, function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an object of plugins by filepaths', function(cb) {
      app.cli.process(['--plugins=test/fixtures/plugins/lower.js'], function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        cb();
      });
    });

    it('should strip quotes from values', function(cb) {
      app.cli.process(['--plugins="test/fixtures/plugins/lower.js"'], function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        cb();
      });
    });

    it('should register an object of plugins by filepaths', function(cb) {
      var config = {
        plugins: {
          lower: './test/fixtures/plugins/lower.js',
          upper: './test/fixtures/plugins/upper.js'
        }
      };

      app.cli.process(config, function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of plugins by filepaths', function(cb) {
      var config = {
        plugins: ['./test/fixtures/plugins/lower.js', './test/fixtures/plugins/upper.js']
      };

      app.cli.process(config, function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of plugin modules', function(cb) {
      var config = {
        plugins: ['gulp-format-md']
      };

      app.cli.process(config, function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('formatMd'));
        cb();
      });
    });

    it('should register a glob of plugins', function(cb) {
      var config = {
        plugins: ['./test/fixtures/plugins/*.js']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });
  });
});
