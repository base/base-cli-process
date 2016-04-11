'use strict';

var utils = require('../utils');

module.exports = function(existing, app) {
  return {
    type: ['object', 'string'],
    normalize: function(val, key, config, schema) {

      if (utils.isObject(val) && typeof val.render === 'boolean') {
        config[key] = val.render;
        return config[key];
      }
      return val;
    }
  };
};
