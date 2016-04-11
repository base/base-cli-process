'use strict';

var merge = require('merge-deep');
var normalize = require('../normalize');
var utils = require('../utils');

/**
 * Persist a value to a namespaced config object in package.json. For
 * example, if you're using `verb`, the value would be saved to the
 * `verb` object.
 *
 * ```sh
 * # display the config
 * $ --config
 * # set a boolean for the current project
 * $ --config=toc
 * # save the cwd to use for the current project
 * $ --config=cwd:foo
 * # save the tasks to run for the current project
 * $ --config=tasks:readme
 * ```
 *
 * @name config
 * @param {Object} app
 * @api public
 * @cli public
 */

module.exports = function(app, base, options) {
  return function(val, key, config, next) {
    app.debug('command > %s: "%j"', key, val);

    var name = app._name.toLowerCase();
    if (utils.show(val)) {
      var pkgConfig = {};
      pkgConfig[name] = app.pkg.get(name) || {};
      console.log(utils.formatValue(pkgConfig));
      next();
      return;
    }

    var keys = Object.keys(val);
    var orig = app.pkg.get(name) || {};

    // temporarily remove the config object from package.json
    app.pkg.del(name);

    // normalize both the old and new values befor merging, using
    // a schema that is specifically used for normalizing values to
    // be written back to package.json
    orig = normalize(app, orig);
    val = normalize(app, val);

    // merge the normalized values
    var merged = merge({}, orig, val);

    // show the new value in the console
    var show = utils.pick(merged, keys);
    utils.timestamp('updated package.json config with', utils.formatValue(show));

    // update options and `cache.config`
    app.option(merged);
    app.set('cache.config', merged);
    app.emit('config', merged);

    // update the config property
    config[key] = merged;

    // re-set updated config object in `package.json`
    app.pkg.set(name, merged);
    app.pkg.save();
    next();
  };
};
