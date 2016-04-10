'use strict';

require('mocha');
require('helper-example');
require('helper-coverage');
var assert = require('assert');
var Base = require('base');
var assemble = require('assemble-core');
var cli = require('..');
var app;

describe('.map.helpers (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(cli());
  });

  it('should error when app.helpers is not a function', function(cb) {
    app.cli.process(['--helpers="test/fixtures/helpers/*.js"'], function(err) {
      assert.equal(err.message, 'expected app.helper to be a function');
      cb();
    });
  });

  it('should error when app.helpers is not a function', function(cb) {
    app.cli.process({
      helpers: {
        lower: function() {},
        upper: function() {}
      }
    }, function(err) {
      assert.equal(err.message, 'expected app.helper to be a function');
      cb();
    });
  });
});

describe('.map.helpers', function() {
  beforeEach(function() {
    app = assemble();
    app.use(cli());
  });

  describe('argv', function() {
    it.skip('should not choke on an empty object', function(cb) {
      app.cli.process(['--helpers=foo'], cb);
    });

    it('should register an object of helper functions', function(cb) {
      var cli = {
        helpers: {
          lower: function() {},
          upper: function() {}
        }
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an object of helpers by filepaths', function(cb) {
      var cli = {
        helpers: {
          lower: './test/fixtures/helpers/lower.js',
          upper: './test/fixtures/helpers/upper.js'
        }
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helpers by filepaths', function(cb) {
      var cli = {
        helpers: ['./test/fixtures/helpers/lower.js', './test/fixtures/helpers/upper.js']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helper modules', function(cb) {
      var cli = {
        helpers: ['helper-coverage', 'helper-example']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('example'));
        assert(app._.helpers.sync.hasOwnProperty('coverage'));
        cb();
      });
    });

    it('should register a glob of helpers', function(cb) {
      var cli = {
        helpers: ['./test/fixtures/helpers/*.js']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });
  });

  describe('options object', function() {
    it('should not choke on an empty object', function(cb) {
      app.cli.process({helpers: {}}, cb);
    });

    it('should register an object of helper functions', function(cb) {
      var cli = {
        helpers: {
          lower: function() {},
          upper: function() {}
        }
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an object of helpers by filepaths', function(cb) {
      var cli = {
        helpers: {
          lower: './test/fixtures/helpers/lower.js',
          upper: './test/fixtures/helpers/upper.js'
        }
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helpers by filepaths', function(cb) {
      var cli = {
        helpers: ['./test/fixtures/helpers/lower.js', './test/fixtures/helpers/upper.js']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helper modules', function(cb) {
      var cli = {
        helpers: ['helper-coverage', 'helper-example']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('example'));
        assert(app._.helpers.sync.hasOwnProperty('coverage'));
        cb();
      });
    });

    it('should register a glob of helpers', function(cb) {
      var cli = {
        helpers: ['./test/fixtures/helpers/*.js']
      };

      app.cli.process(cli, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });
  });
});
