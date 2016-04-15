'use strict';

var base = require('./base-normalizer');

module.exports = function(app) {
  var obj = base(app);
  var fn = obj.normalize;

  return {
    types: ['array', 'boolean', 'object', 'string'],
    normalize: function(val, key, config, schema) {
      if (!val) return;
      config.helpers = fn.apply(schema, arguments);
      schema.omit(key);
    }
  };
};
