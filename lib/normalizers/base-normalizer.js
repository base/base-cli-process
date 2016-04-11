'use strict';

var utils = require('../utils');

module.exports = function(app) {
  return {
    type: ['array', 'string', 'object'],
    normalize: function(val, key, config, schema) {
      if (!val) return;

      if (typeof val === 'string') {
        val = val.split(',');
      }

      if (Array.isArray(val)) {
        var len = val.length;
        var idx = -1;
        while (++idx < len) {
          val[idx] = utils.stripQuotes(val[idx]);
        }
      }

      return val;
    }
  };
};
