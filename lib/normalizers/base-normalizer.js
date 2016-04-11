'use strict';

var utils = require('../utils');

module.exports = function(existing, app) {
  existing = utils.arrayify(existing);

  return {
    type: ['array', 'string', 'object'],
    normalize: function(val, key, config, schema) {
      if (!val) return;

      if (typeof val === 'string') {
        val = val.split(',');
      }

      if (Array.isArray(val)) {
        val = utils.unionify([], existing, val);
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
