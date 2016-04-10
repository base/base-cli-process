'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-cli', 'cli');
require('base-cli-schema', 'schema');
require('base-config-process', 'config');
require('base-option', 'option');
require('log-utils', 'log');
require('mixin-deep', 'merge');
require('os-homedir', 'home');
require('union-value', 'union');

utils.colors = utils.log.colors;
utils.magenta = utils.colors.magenta;

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
 * Expose `utils`
 */

module.exports = utils;
