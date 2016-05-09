'use strict';

var cli = require('./');
var argv = require('minimist')(process.argv.slice(2));
var data = require('base-data');
var Base = require('base');
var base = new Base({isApp: true});
base._name = 'verb';
base.use(data());
base.use(cli());

base.cli.process(argv, function(err) {
  if (err) throw err;
  console.log('done');
});
