'use strict';

require('mocha');
require('engine-base');
var assert = require('assert');
var Base = require('base');
var assemble = require('assemble-core');
var cli = require('..');
var app;

describe('.map.engine (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(cli());
  });

  describe('argv', function(cb) {
    it('should error when app.engine is not a function', function(cb) {
      app.cli.process(['--engine=*:engine-base'], function(err) {
        assert.equal(err.message, 'expected app.engine to be a function');
        cb();
      });
    });
  });

  describe('options object', function(cb) {
    it('should error when app.engine is not a function', function(cb) {
      app.cli.process({engine: {'*': 'engine-base'}}, function(err) {
        assert.equal(err.message, 'expected app.engine to be a function');
        cb();
      });
    });
  });
});

describe('.map.engine', function() {
  beforeEach(function() {
    app = assemble();
    app.use(cli());
  });

  describe('argv', function() {
    it('should register an engine string', function(cb) {
      app.cli.process(['--engine=engine-base'], function(err, obj) {
        if (err) return cb(err);
        assert(app.engines.hasOwnProperty('.base'));
        cb();
      });
    });

    it('should register an engine by object key', function(cb) {
      app.cli.process(['--engine.*=engine-base'], function(err) {
        if (err) return cb(err);
        assert(app.engines.hasOwnProperty('.*'));
        cb();
      });
    });
  });

  describe('options object', function() {
    it('should register an engine string', function(cb) {
      app.cli.process({engines: 'engine-base'}, function(err, obj) {
        if (err) return cb(err);
        assert(app.engines.hasOwnProperty('.base'));
        cb();
      });
    });

    it('should register an engine by object key', function(cb) {
      app.cli.process({engines: {'*': 'engine-base'}}, function(err) {
        if (err) return cb(err);
        assert(app.engines.hasOwnProperty('.*'));
        cb();
      });
    });
  });
});
