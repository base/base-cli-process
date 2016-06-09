'use strict';

var fields = require('./lib/fields');

module.exports = function(app, base) {
  app.use(require('verb-readme-generator'));

  app.helper('flags', function() {
    return toList(fields).join('\n');
  });

  app.task('default', ['readme']);
};

function toList(obj) {
  return Object.keys(obj).map(function(key) {
    var flag = '- `--' + key + '`';
    var fn = obj[key];
    if (fn.help) flag += ': ' + fn.help;
    return flag;
  });
}
