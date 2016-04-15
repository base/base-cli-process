'use strict';

var path = require('path');
var merge = require('merge-deep');
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
    var pkgPath = path.resolve(app.cwd, 'package.json');
    var pkg = {};

    if (utils.exists(pkgPath)) {
      pkg = require(pkgPath);
    }

    pkg = merge({}, app.pkg.data, pkg);
    app.pkg.del(name);

    var orig = pkg[name] || {};

    // normalize both the old and new values befor merging, using
    // a schema that is specifically used for normalizing values to
    // be written back to package.json
    orig = app.cli.schema.normalize(orig);

    // merge the normalized values
    var merged = val;
    if (utils.isObject(val) && utils.isObject(orig)) {
      merged = merge({}, orig, val);
    }

    // show the new value in the console
    var show = utils.pick(merged, keys);
    utils.timestamp('updated package.json config with', utils.formatValue(show));

    // update options and `cache.config`
    app.set('cache.config', merged);
    app.emit('config', merged);

    // update the config property
    config[key] = merged;

    // re-set updated config object in `package.json`
    app.pkg.set(name, merged);
    app.pkg.save();

    app.cli.process(merged, next);
  };
};
