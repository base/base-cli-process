'use strict';

var debug = require('debug');
var field = debug('base:cli:process:field');

module.exports = function(prop) {
  return debug('base:cli:process:' + prop);
};

module.exports.field = function(key, val) {
  base('field')('normalizing ' + key + ', ' + val);
};

