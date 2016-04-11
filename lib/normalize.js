'use strict';

var utils = require('./utils');
var fields = require('./normalizers');
var debug = require('debug')('base:templates:verb:cli');

/**
 * Normalize the config object to be written to either `app.store.data`
 * or the user's local config. Local config is usually a property on
 * package.json, but may also be a separate file.
 */

module.exports = function(app, config, existing) {
  var opts = utils.merge({omitEmpty: true, sortArrays: false}, app.options);
  opts.keys = ['run', 'toc', 'layout', 'tasks', 'options', 'data', 'plugins', 'related', 'reflinks'];

  existing = existing || {};
  var schema = new utils.Schema(opts);
  var omit = opts.omit || [];

  for (var key in fields) {
    if (!~omit.indexOf(key) && key in fields) {
      debug('adding schema field > %s', key);
      schema.field(key, fields[key](existing[key], app));
    }
  }
  return schema.normalize(config);
};

