'use strict';

module.exports = function(app) {
  return function(val, key, config, next) {
    if (!val) return next();
    app.config.process({use: val}, next);
  };
};
