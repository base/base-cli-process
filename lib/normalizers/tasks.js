'use strict';

var utils = require('../utils');

module.exports = function(existing, app) {
  existing = utils.arrayify(existing);
  return {
    type: ['array', 'string'],
    normalize: function(val, key, config, schema) {
      if (!val) return [];

      if (typeof val === 'string') {
        val = val.split(',');
      }
      if (Array.isArray(val)) {
        val = utils.unionify([], existing, val);
      }
      if (val.length) {
        return val;
      }
      return null;
    }
  };
};
