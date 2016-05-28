'use strict';

function getConfigurationFrom(obj) {

  function isIntegerPolyfill(n) {
    if (!Number.isFinite(n)) return false;
    if (n % 1 === 0) return true;
    return false;
  }
  var isInteger = 'isInteger' in Number ? Number.isInteger : isIntegerPolyfill;

  var ret = {
    getAsStringOrUndefined: function getAsStringOrUndefined(k) {
      if (!(k in obj)) return undefined;
      if (obj[k] instanceof Object && typeof obj[k] === 'object') return JSON.stringify(obj[k]);
      return obj[k] + '';
    },
    getAsStringOrThrow: function getAsStringOrThrow(k) {
      var d = ret.getAsStringOrUndefined(k);
      if (d === undefined) throw new TypeError('Cannot cast ' + k + ' to string');
      return d;
    },
    getAsIntegerOrUndefined: function getAsIntegerOrUndefined(k) {
      if (!(k in obj)) return undefined;
      if (obj[k] === '') return undefined;
      if (obj[k] === true) return undefined;
      if (obj[k] === false) return undefined;
      if (obj[k] === null) return undefined;
      if (obj[k] === undefined) return undefined;
      if (obj[k] instanceof Array) return undefined;
      var d = Number(obj[k]);
      if (!isInteger(d)) return undefined;
      return d;
    },
    getAsIntegerOrThrow: function getAsIntegerOrThrow(k) {
      var d = ret.getAsIntegerOrUndefined(k);
      if (d === undefined) throw new TypeError('Cannot cast ' + k + ' to integer');
      return d;
    },
    getAsBooleanOrUndefined: function getAsBooleanOrUndefined(k) {
      if (!(k in obj)) return undefined;
      var d = obj[k];
      if (d === 'true') return true;
      if (d === '1') return true;
      if (d === true) return true;
      if (d === 1) return true;

      if (d === 'false') return false;
      if (d === '0') return false;
      if (d === false) return false;
      if (d === 0) return false;
      if (d === '') return false;

      return undefined;
    },
    getAsBooleanOrThrow: function getAsBooleanOrThrow(k) {
      var d = ret.getAsBooleanOrUndefined(k);
      if (d === undefined) throw new TypeError('Cannot cast ' + k + ' to boolean');
      return d;
    },
    getAsArrayOrUndefined: function getAsArrayOrUndefined(k) {
      if (!(k in obj)) return undefined;
      if (obj[k] === undefined) return undefined;
      if (obj[k] === null) return undefined;
      if (typeof obj[k] === 'string') return obj[k].split(',');
      return [obj[k]];
    },
    getAsArrayOrThrow: function getAsArrayOrUndefined(k) {
      var d = ret.getAsArrayOrUndefined(k);
      if (d === undefined) throw new TypeError('Cannot cast ' + k + ' to array');
      return d;
    },
    getAsNumberOrUndefined: function getAsNumberOrUndefined(k) {
      if (!(k in obj)) return undefined;
      if (obj[k] === '') return undefined;
      if (obj[k] === true) return undefined;
      if (obj[k] === false) return undefined;
      if (obj[k] === null) return undefined;
      if (obj[k] === undefined) return undefined;
      if (obj[k] instanceof Array) return undefined;
      var d = Number(obj[k]);
      if (!Number.isFinite(d)) return undefined;
      return d;
    },
    getAsNumberOrThrow: function getAsNumberOrThrow(k) {
      var d = ret.getAsNumberOrUndefined(k);
      if (d === undefined) throw new TypeError('Cannot cast ' + k + ' to number');
      return d;
    },
  };

  return ret;
}

function getConfigurationFromEnvironment() {
  return getConfigurationFrom(process.env);
}

module.exports = {
  getConfigurationFrom: getConfigurationFrom,
  getConfigurationFromEnvironment: getConfigurationFromEnvironment,
};
