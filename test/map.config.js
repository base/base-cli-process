'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Base = require('base');
var del = require('delete');
var cli = require('..');
var base;

var cwd = process.cwd();
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var pkgPath = path.resolve(fixtures(), 'package.json');
var pkgTmpl = {
  'name': 'fixtures',
  'version': '0.0.0',
  'private': true,
  'description': '',
  'main': 'index.js',
  'license': 'MIT'
};

describe('.map.config', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(cli());
    base.cwd = fixtures();
    base.pkg.set(pkgTmpl);
    base.pkg.save();
  });

  afterEach(function(cb) {
    del(pkgPath, function(err) {
      if (err) return cb(err);
      base.pkg.data = {};
      cb();
    });
  });

  after(function() {
    base.cwd = cwd;
  });

  describe('argv --config', function() {
    it('should add a `show` property when config is boolean', function(cb) {
      base.cli.process(['--config'], function(err, config) {
        if (err) return cb(err);
        cb();
      });
    });

    it('should convert a string to a boolean', function(cb) {
      base.cli.process(['--config=foo'], function(err, res) {
        if (err) return cb(err);
        assert.equal(res.config.foo, true);
        cb();
      });
    });

    it('should set an object on package.json config', function(cb) {
      base.cli.process(['--config=a:b'], function(err) {
        if (err) return cb(err);
        assert.equal(base.pkg.get([base._name, 'a']), 'b');
        cb();
      });
    });

    it('should merge an object with an existing config object', function(cb) {
      base.pkg.set([base._name, 'foo'], 'bar');
      base.pkg.save();

      base.cli.process(['--config=a:b'], function(err) {
        if (err) return cb(err);
        assert.equal(base.pkg.get([base._name, 'a']), 'b');
        assert.equal(base.pkg.get([base._name, 'foo']), 'bar');
        base.pkg.del([base._name, 'foo']);
        cb();
      });
    });

    it('should merge config onto app.cache.config directly', function(cb) {
      base.cli.process(['--config=a:b'], function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.config.a, 'b');
        cb();
      });
    });

    it('should add a related.list from a string', function(cb) {
      base.cli.process(['--config=related:foo'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'related.list']), ['foo']);
        cb();
      });
    });

    it('should add a related.list from an array-string', function(cb) {
      base.cli.process(['--config=related:foo,'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'related.list']), ['foo']);
        cb();
      });
    });

    it('should add a related.list from an array', function(cb) {
      base.cli.process(['--config=related:foo,bar,baz'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'related.list']), ['foo', 'bar', 'baz']);
        cb();
      });
    });

    it('should add a related.list from an array on `list`', function(cb) {
      base.cli.process(['--config=related.list:foo,bar,baz'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'related.list']), ['foo', 'bar', 'baz']);
        cb();
      });
    });

    it('should add a related.list from a string on `list`', function(cb) {
      base.cli.process(['--config=related.list:foo'], function(err) {
        if (err) return cb(err);
        assert.deepEqual(base.pkg.get([base._name, 'related.list']), ['foo']);
        cb();
      });
    });

    it('should emit `config`', function(cb) {
      base.on('config', function(val) {
        assert.deepEqual(val, {a: 'b'});
        cb();
      });

      base.cli.process(['--config=a:b'], function(err) {
        if (err) return cb(err);
      });
    });
  });

  describe('config object', function() {
    it('should merge config onto app.cache.config', function(cb) {
      base.cli.process({config: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.config.a, 'b');
        cb();
      });
    });

    it('should merge config onto app.cache.config', function(cb) {
      base.cli.process({config: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.config.a, 'b');
        cb();
      });
    });

    it('should emit `config`', function(cb) {
      var count = 0;
      base.on('config', function(val) {
        assert.deepEqual({a: 'b'}, val);
        count++;
      });

      base.cli.process({config: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });
  });
});
