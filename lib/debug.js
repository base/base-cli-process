'use strict';

var debug = require('debug');
var field = debug('base:cli:process:field');

module.exports.field = function(key, val) {
  field('normalizing ' + key + ', ' + val);
};

