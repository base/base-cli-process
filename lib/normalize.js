'use strict';

var utils = require('./utils');
var fields = require('./normalizers');
var debug = require('debug')('base:templates:verb:cli');

/**
 * Normalize the config object to be written to either `app.store.data`
 * or the user's local config. Local config is usually a property on
 * package.json, but may also be a separate file.
 */

module.exports = function(app, config, existing, options) {
  var opts = utils.merge({omitEmpty: true, sortArrays: false}, options);
  opts.keys = ['run', 'toc', 'layout', 'tasks', 'options', 'data', 'plugins', 'related', 'reflinks'];

  var schema = new utils.Schema(opts);
  for (var key in fields) {
    debug('adding schema field > %s', key);
    schema.field(key, fields[key](existing[key], app));
  }

  return schema.normalize(config);
};

