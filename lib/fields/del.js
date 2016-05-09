'use strict';

var utils = require('../utils');

/**
 * Set a value that was temporarily stored by `--get`.
 *
 * ```json
 * $ app --get
 * ```
 * @name get
 * @api public
 */

module.exports = function(app) {
  return function(prop, key, config, next) {
    if (typeof prop === 'undefined') {
      next();
      return;
    }

    var keys = prop.split('.');
    var init = keys.shift();
    utils.assertPlugins(app, init);
    prop = keys.join('.');

    switch(init) {
      case 'pkg':
        app.pkg.del(prop);
        app.pkg.save();
        break;
      case 'config':
        app.pkg.del(app._name, prop);
        app.pkg.save();
        break;
      case 'global':
        app.globals.del(prop);
        break;
      case 'store':
        app.store.del(prop);
        break;
      case 'option':
        app.del(['options', prop]);
        break;
      case 'data':
        app.del(['cache.data', prop]);
        break;
      default:
        app.del(prop);
        break;
    }
    next();
  };
};
