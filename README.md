# confenv
[![Build Status](https://travis-ci.org/allevo/confenv.svg?branch=master)](https://travis-ci.org/allevo/confenv)
[![Coverage Status](https://coveralls.io/repos/github/allevo/confenv/badge.svg?branch=master)](https://coveralls.io/github/allevo/confenv?branch=master)

Load configuration from environment variables.

Simple, easy, no deps.

## Why
This module is useful for all environment that requires that the configuration is loaded from environment.
But the environment variables aren't typed. And this means you must cast all values to the right type.

Using this module, your code is clean from any type casting.

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
