'use strict';

var utils = require('../utils');

/**
 * Get a value from `app` and set it on `app.cache.get` in memory, allowing the value to be
 * re-used by another command, like `--set`.
 *
 * ```json
 * $ app --get=pkg.name
 * ```
 * @name get
 * @api public
 */

module.exports = function(app) {
  return function(prop, key, config, next) {
    if (typeof prop !== 'string') {
      next();
      return;
    }

    var keys = prop.split('.');
    var firstKey = keys.shift();
    var rest = keys.join('.');
    var val;

    utils.assertPlugins(app, firstKey);

    switch(firstKey) {
      case 'pkg':
        val = app.pkg.get(rest);
        break;
      case 'config':
        val = keys.length ? app.pkg.get([app._name, rest]) : app.pkg.get(app._name);
        break;
      case 'globals':
        val = keys.length ? app.globals.get(rest) : app.globals.data;
        break;
      case 'store':
        val = keys.length ? app.store.get(rest) : app.store.data;
        break;
      case 'data':
        val = keys.length ? app.data(rest) : app.cache.data;
        break;
      case 'option':
        val = keys.length ? app.option(rest) : app.options;
        break;
      default:
        val = app.get(prop);
        break;
    }

    var obj = {};
    obj[rest] = val;
    console.log(utils.formatValue(obj));
    app.set('cache.get', val);
    next();
  };
};
