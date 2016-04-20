'use strict';

var fns = require('../fns');

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
 *     "asyncHelpers": {
 *       "helper-foo": {},
 *       "helper-bar": {}
 *     }
 *   }
 * }
 *
 * // register a glob of async helpers
 * {
 *   "verb": {
 *     "ayncHelper": ["foo/*.js"]
 *   }
 * }
 * ```
 * @name asyncHelpers
 * @api public
 */

module.exports = function(app) {
  return fns(app, 'asyncHelpers');
};
