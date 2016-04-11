'use strict';

var utils = require('../utils');

module.exports = function(existing, app) {
  existing = existing || {};
  existing.list = utils.arrayify(existing.list);

  return {
    type: ['array', 'string'],
    normalize: function(val, key, config, schema) {
      if (!val) return;
      if (typeof val === 'string') {
        val = { list: val.split(',') };
      }

      if (Array.isArray(val)) {
        val = { list: val };
      }

      if (typeof val.list === 'string') {
        val.list = val.list.split(',');
      }
      config[key] = val;
      return val;
    }
  };
};
