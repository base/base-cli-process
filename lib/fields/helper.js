'use strict';

var helpers = require('./helpers');

/**
 * Alias for [helpers](#helpers).
 *
 * @name helper
 * @api public
 */

module.exports = function(app) {
  return helpers(app);
};
