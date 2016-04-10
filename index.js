'use strict';

var debug = require('debug')('base:cli:process');
var fields = require('./lib/fields/');
var utils = require('./lib/utils');

/**
 * Custom mappings for the base-cli plugin.
 */

module.exports = function(config) {
  return function(app, base) {
    if (!this.isApp) return;
    if (this.isRegistered('base-cli-process')) return;
    var options = opts(app, config);
    var schema;

    if (typeof this.cli === 'undefined') {
      this.use(utils.cli(options));
    }

    if (typeof this.option === 'undefined') {
      this.use(utils.option(options));
    }

    if (typeof this.config === 'undefined') {
      this.use(utils.config(options));
    }

    Object.defineProperty(this.cli, 'schema', {
      cliurable: true,
      enumerable: true,
      set: function(val) {
        schema = val;
      },
      get: function() {
        return schema || utils.schema(app, opts(app, config));
      }
    });

    // add commands
    for (var key in fields) {
      debug('mapping field "%s"', key);
      app.cli.map(key, fields[key](app, base, options));
    }

    var fn = this.cli.process;

    this.cli.process = function(val, cb) {
      var obj = this.schema.normalize(val, opts(app, config));
      fn.call(this, obj, function(err) {
        if (err) return cb(err);
        cb(null, obj);
      });
    };
  };
};

function opts(app, config) {
  var options = utils.merge({}, config, app.options);
  if (options.schema) {
    return utils.merge({}, options, options.schema);
  }
  return options;
}
