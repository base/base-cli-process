'use strict';

var utils = require('../utils');

module.exports = function(app) {
  return {
    type: ['object', 'string'],
    normalize: function(val, key, config, schema) {
      if (!val) return;

      if (val === 'render') {
        val = { render: true };
      }
      if (typeof val === 'boolean') {
        val = { render: val };
      }
      if (utils.isObject(val) && typeof val.render === 'boolean') {
        config[key] = val.render;
        return config[key];
      }
      return val;
    }
  };
};
