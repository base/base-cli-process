'use strict';

var util = require('util');
var utils = require('../utils');

/**
 * _(Requires [templates][], otherwise ignored)_
 *
 * Register helpers to use in templates. Value can be a string or
 * array of module names, glob patterns, or file paths, or an object
 * where each key is a filepath, glob or module name, and the value
 * is an options object to pass to resolved helpers.
 *
 * _(Modules must be locally installed and listed in `dependencies` or
 * `devDependencies`)_.
 *
 * ```json
 * // module names
 * {
 *   "verb": {
 *     "helpers": {
 *       "helper-foo": {},
 *       "helper-bar": {}
 *     }
 *   }
 * }
 *
 * // register a glob of helpers
 * {
 *   "verb": {
 *     "helpers": ["foo/*.js"]
 *   }
 * }
 * ```
 * @name helpers
 * @api public
 */

module.exports = function(app) {
  return function(val, key, config, next) {
    if (typeof val === 'string') {
      val = utils.stripQuotes(val);
    }
    app.config.process({helpers: val}, next);
  };
};
