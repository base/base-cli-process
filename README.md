# base-cli-process [![NPM version](https://img.shields.io/npm/v/base-cli-process.svg?style=flat)](https://www.npmjs.com/package/base-cli-process) [![NPM downloads](https://img.shields.io/npm/dm/base-cli-process.svg?style=flat)](https://npmjs.org/package/base-cli-process) [![Build Status](https://img.shields.io/travis/jonschlinkert/base-cli-process.svg?style=flat)](https://travis-ci.org/jonschlinkert/base-cli-process)

Normalizers for common argv commands handled by the base-cli plugin. Also pre-processes the given object with base-cli-schema before calling `.process()`

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install base-cli-process --save
```

## Usage

Normalizes the given object with [base-cli-schema](https://github.com/jonschlinkert/base-cli-schema) before calling the `.process` method from [base-cli](https://github.com/node-base/base-cli).

```js
var Base = require('base');
var cli = require('base-cli-process');

var app = new Base();
app.use(cli());

var pkg = require('./package');

app.cli.process(pkg, function(err) {
  if (err) throw err;
});
```

## API

### [.asyncHelpers](lib/fields/asyncHelpers.js#L15)

Load and register async template helpers from a glob or filepath.

**Example**

```sh
$ app --asyncHelpers="foo.js"
```

### [.config](lib/fields/config.js#L32)

Persist a value to a namespaced config object in package.json. For example, if you're using `verb`, the value would be saved to the `verb` object.

**Params**

* **{Object}**: app

**Example**

```sh
# display the config
$ app --config
# set a boolean for the current project
$ app --config=toc
# save the cwd to use for the current project
$ app --config=cwd:foo
# save the tasks to run for the current project
$ app --config=tasks:readme
```

### [.cwd](lib/fields/cwd.js#L17)

Set the `--cwd` to use in the current project.

**Example**

```sh
$ app --cwd=foo
```

### [.data](lib/fields/data.js#L23)

Define data to be used for rendering templates.

**Example**

```sh
$ app --data=foo:bar
# {foo: 'bar'}

$ app --data=foo.bar:baz
# {foo: {bar: 'baz'}}

$ app --data=foo:bar,baz
# {foo: ['bar', 'baz']}}
```

### [.dest](lib/fields/dest.js#L17)

Set a `dest` path on `app.options`.

**Example**

```sh
$ app --dest=foo
```

### [.engines](lib/fields/engine.js#L12)

Alias for [engines](#engines)

### [.engines](lib/fields/engines.js#L15)

Load engines from a filepath or glob pattern.

**Example**

```sh
$ app --engines="./foo.js"
```

### [.help](lib/fields/help.js#L19)

Show a help menu.

**Example**

```sh
$ app --help
```

### [.helpers](lib/fields/helpers.js#L15)

Load and register async template helpers from a glob or filepath.

**Example**

```sh
$ app --helpers="foo.js"
```

### [.option](lib/fields/option.js#L15)

Set options. This is the API-equivalent of calling `app.option('foo', 'bar')`.

**Example**

```sh
$ app --option=foo:bar
```

### [.options](lib/fields/options.js#L15)

Set options. This is the API-equivalent of calling `app.option('foo', 'bar')`.

**Example**

```sh
$ app --options=foo:bar
```

### [.plugins](lib/fields/plugins.js#L15)

Load plugins from a filepath or glob pattern.

**Example**

```sh
$ app --plugins="./foo.js"
```

### [.run](lib/fields/run.js#L13)

For tasks to run, regardless of other options passed on the command line.

**Example**

```json
$ app --run
```

### [.toc](lib/fields/toc.js#L18)

Enable or disable Table of Contents rendering

**Example**

```sh
# enable
$ app --toc
# or
$ app --toc=true
# disable
$ app --toc=false
```

## Related projects

You might also be interested in these projects:

* [base-cli](https://www.npmjs.com/package/base-cli): Plugin for base-methods that maps built-in methods to CLI args (also supports methods from a… [more](https://www.npmjs.com/package/base-cli) | [homepage](https://github.com/node-base/base-cli)
* [base-config](https://www.npmjs.com/package/base-config): base-methods plugin that adds a `config` method for mapping declarative configuration values to other 'base'… [more](https://www.npmjs.com/package/base-config) | [homepage](https://github.com/node-base/base-config)
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/base-cli-process/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 07, 2016._