# base-cli-process [![NPM version](https://img.shields.io/npm/v/base-cli-process.svg?style=flat)](https://www.npmjs.com/package/base-cli-process) [![NPM downloads](https://img.shields.io/npm/dm/base-cli-process.svg?style=flat)](https://npmjs.org/package/base-cli-process) [![Build Status](https://img.shields.io/travis/jonschlinkert/base-cli-process.svg?style=flat)](https://travis-ci.org/jonschlinkert/base-cli-process)

Normalizers for common argv commands handled by the base-cli plugin. Also pre-processes the given object with base-cli-schema before calling `.process()`

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save base-cli-process
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

### [.del](lib/fields/del.js#L20)

Delete a value from `app`.

**Example**

```json
# delete a value from package.json config (e.g. `verb` object)
$ app --del=config.foo
# delete a value from in-memory options
$ app --del=option.foo
# delete a property from the global config store
$ app --del=globals.foo
```

### [.dest](lib/fields/dest.js#L17)

Set a `dest` path on `app.options`.

**Example**

```sh
$ app --dest=foo
```

### [.enable](lib/fields/enable.js#L14)

Enable a configuration setting. Also pass `-c` to save the value to the `verb.config` object in package.json.

**Example**

```sh
$ app --enable toc
```

### [.engines](lib/fields/engine.js#L12)

Alias for [engines](#engines)

### [.engines](lib/fields/engines.js#L15)

Load engines from a filepath or glob pattern.

**Example**

```sh
$ app --engines="./foo.js"
```

### [.get](lib/fields/get.js#L16)

Get a value from `app` and set it on `app.cache.get` in memory, allowing the value to be re-used by another command, like `--set`.

**Example**

```json
$ app --get=pkg.name
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

### [.set](lib/fields/set.js#L17)

Set the given value, or a value was previously cached by `--get`.

**Example**

```json
$ app --set=pkg.name:foo
# example: persist `pkg.name` to `store.data.name`
$ app --get=pkg.name --set=store.name
```

### [.get](lib/fields/show.js#L16)

Get a value from `app` and set it on `app.cache.get` in memory, allowing the value to be re-used by another command, like `--set`.

**Example**

```json
$ app --get=pkg.name
```

### [.toc](lib/fields/toc.js#L20)

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

* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://github.com/node-base/base) | [homepage](https://github.com/node-base/base "base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")
* [base-cli](https://www.npmjs.com/package/base-cli): Plugin for base-methods that maps built-in methods to CLI args (also supports methods from a… [more](https://github.com/node-base/base-cli) | [homepage](https://github.com/node-base/base-cli "Plugin for base-methods that maps built-in methods to CLI args (also supports methods from a few plugins, like 'base-store', 'base-options' and 'base-data'.")
* [base-config](https://www.npmjs.com/package/base-config): base-methods plugin that adds a `config` method for mapping declarative configuration values to other 'base… [more](https://github.com/node-base/base-config) | [homepage](https://github.com/node-base/base-config "base-methods plugin that adds a `config` method for mapping declarative configuration values to other 'base' methods or custom functions.")

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

_(This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
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

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 07, 2016._