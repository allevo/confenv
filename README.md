# confenv
Load configuration from environment variables.

Simple, easy, no deps.

## Why
This module is useful for all environment that requires that the configuration is loaded from environment.
But the environment variables aren't typed. And this means you must cast all values to the right type.

Using this module, your code is clean from any type casting.

## getConfigurationFrom
Take an object as parameter and return a `Conf` instance

## getConfigurationFromEnvironment
call getConfigurationFrom with `process.env` as parameter

## Conf class
There're two method types of Conf class: `getAs<Type>OrUndefined` and `getAs<Type>OrThrow`.

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
