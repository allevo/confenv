# confenv
[![Build Status](https://travis-ci.org/allevo/confenv.svg?branch=master)](https://travis-ci.org/allevo/confenv)
[![Coverage Status](https://coveralls.io/repos/github/allevo/confenv/badge.svg?branch=master)](https://coveralls.io/github/allevo/confenv?branch=master)
[![npm](https://img.shields.io/npm/l/confenv.svg?maxAge=2592000)]()
[![David](https://img.shields.io/david/allevo/confenv.svg?maxAge=2592000)]()

Load configuration from environment variables.
Simple, easy, no deps.

## getConfigurationFrom
This function takes an object as parameter and return a `Configuration` instance

## getConfigurationFromEnvironment
This function calls getConfigurationFrom with `process.env` as parameter

## Configuration class
There're two method types of Configuration class: `getAs<Type>OrUndefined` and `getAs<Type>OrThrow`.

`<Type>` could be one of them:
 - String
 - Integer
 - Array
 - Boolean
 - Float

### getAs&lt;Type&gt;OrUndefined
Return `<Type>` or `undefined`

### getAs&lt;Type&gt;OrThrow
Return `<Type>` or throw a `TypeError`

## Example

First of all, your code should load all configuration. This allows you to assert the configuration is loaded correctly.
If not, your process has two choices:
 - fallback to a default value
 - throw an error following with the process dead

```
var conf = require('confenv').getConfigurationFromEnvironment();
```
or
```
var conf = require('confenv').getConfigurationFromEnvironment(myPlainObject);
```
then
```
var HTTP_PORT = conf.getAsIntegerOrThrow('HTTP_PORT');

var MYSQL_HOST = conf.getAsStringOrThrow('MYSQL_HOST');
var MYSQL_PORT = conf.getAsStringOrThrow('MYSQL_PORT');
var MYSQL_DATABASE = conf.getAsStringOrThrow('MYSQL_DATABASE');
var MYSQL_USER = conf.getAsStringOrThrow('MYSQL_USER');
var MYSQL_PASSWORD = conf.getAsStringOrThrow('MYSQL_PASSWORD');

// Start connection to mysql server and http web server
```

## Why?
As http://12factor.net/ suggests, your configuration should be exposed through environment variables. This allows to use the same code in every environment like development, staging and prodcution.
But the environment variables aren't typed. And this means you must cast all values to the right type.

Using this module, your code is clean from any type casting.
