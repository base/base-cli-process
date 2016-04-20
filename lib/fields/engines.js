'use strict';

var fns = require('../fns');

/**
 * _(Requires [templates][], otherwise ignored)_
 *
 * Register engines to use for rendering templates. Object-keys are used
 * for the engine name, and the value can either be the module name, or
 * an options object with the module name defined on the `name` property.
 *
 * _(Modules must be locally installed and listed in `dependencies` or
 * `devDependencies`)_.
 *
 * ```json
 * // module name
 * {"verb": {"engines": {"*": "engine-base"}}}
 *
 * // options
 * {"verb": {"engines": {"*": {"name": "engine-base"}}}}
 * ```
 * @name engines
 * @api public
 */

module.exports = function(app) {
  return fns(app, 'engines');
};
