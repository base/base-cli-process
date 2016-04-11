'use strict';

var path = require('path');
var util = require('util');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('arrayify-compact', 'arrayify');
require('arr-union');
require('base-cli', 'cli');
require('base-cli-schema', 'schema');
require('base-config-process', 'config');
require('base-option', 'option');
require('kind-of', 'typeOf');
require('log-utils', 'log');
require('mixin-deep', 'merge');
require('map-schema', 'Schema');
require('object.pick', 'pick');
require('os-homedir', 'home');
require('union-value', 'union');
require = fn;

utils.colors = utils.log.colors;
utils.magenta = utils.colors.magenta;
utils.cyan = utils.colors.cyan;

/**
 * Format a value to be displayed in the command line
 */

utils.formatValue = function(val) {
  var res = utils.cyan(util.inspect(val, null, 10));
  if (utils.isObject(val) && Object.keys(val).length > 1) {
    return '\n' + res;
  }
  return res;
};

/**
 * Get a home-relative filepath
 */

utils.homeRelative = function(filepath) {
  filepath = path.relative(utils.home(), path.resolve(filepath));
  return path.normalize(filepath);
};

/**
 * Log out a formatted timestamp
 */

utils.timestamp = function() {
  var args = [].slice.call(arguments);
  args.unshift(utils.log.timestamp);
  console.log.apply(console, args);
};

/**
 * Strip the quotes from a string
 */

utils.stripQuotes = function(str) {
  return str.replace(/^['"]|['"]$/g, '');
};

/**
 * Returns true if `val` is true or is an object with `show: true`
 *
 * @param {String} `val`
 * @return {Boolean}
 * @api public
 */

utils.show = function(val) {
  return utils.isObject(val) && val.show === true;
};

/**
 * Return true if a value is an object.
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Return true if a value is a string with non-zero length.
 */

utils.isString = function(val) {
  return val && typeof val === 'string';
};

/**
 * Union and uniquify results
 */

utils.unionify = function() {
  return utils.arrayify(utils.arrUnion.apply(null, arguments));
};

/**
 * Expose `utils`
 */

module.exports = utils;
