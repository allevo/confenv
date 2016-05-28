/*eslint-env mocha*/
'use strict';

var assert = require('assert');
var confenv = require('./index');
var getConfigurationFrom = confenv.getConfigurationFrom;

var CONF = {
  // Cast string
  VAR01: 'pippo',
  VAR02: '1',
  VAR03: 'true',
  VAR04: '{}',
  VAR05: '[]',
  VAR06: 'pluto,pippo,paperino',
  VAR07: 'false',
  VAR08: '-3.4',
  VAR09: '0',
  VAR10: '',
  // cast native obj
  VAR11: true,
  VAR12: false,
  VAR13: 0,
  VAR14: 1,
  VAR15: -5.6,
  VAR16: {},
  VAR17: [],
  VAR18: function() { /* istanbul ignore next */ return 1; },
  VAR19: undefined,
  VAR20: null,
};

var TYPES = {
  'String': {
    VAR01: 'pippo',
    VAR02: '1',
    VAR03: 'true',
    VAR04: '{}',
    VAR05: '[]',
    VAR06: 'pluto,pippo,paperino',
    VAR07: 'false',
    VAR08: '-3.4',
    VAR09: '0',
    VAR10: '',
    VAR11: 'true',
    VAR12: 'false',
    VAR13: '0',
    VAR14: '1',
    VAR15: '-5.6',
    VAR16: '{}',
    VAR17: '[]',
    VAR18: CONF.VAR18.toString(),
    VAR19: 'undefined',
    VAR20: 'null',
    NonExistentKey: TypeError,
  },
  'Integer': {
    VAR01: TypeError,
    VAR02: 1,
    VAR03: TypeError,
    VAR04: TypeError,
    VAR05: TypeError,
    VAR06: TypeError,
    VAR07: TypeError,
    VAR08: TypeError,
    VAR09: 0,
    VAR10: TypeError,
    VAR11: TypeError,
    VAR12: TypeError,
    VAR13: 0,
    VAR14: 1,
    VAR15: TypeError,
    VAR16: TypeError,
    VAR17: TypeError,
    VAR18: TypeError,
    VAR19: TypeError,
    VAR20: TypeError,
    NonExistentKey: TypeError,
  },
  'Boolean': {
    VAR01: TypeError,
    VAR02: true,
    VAR03: true,
    VAR04: TypeError,
    VAR05: TypeError,
    VAR06: TypeError,
    VAR07: false,
    VAR08: TypeError,
    VAR09: false,
    VAR10: false,
    VAR11: true,
    VAR12: false,
    VAR13: false,
    VAR14: true,
    VAR15: TypeError,
    VAR16: TypeError,
    VAR17: TypeError,
    VAR18: TypeError,
    VAR19: TypeError,
    VAR20: TypeError,
    NonExistentKey: TypeError,
  },

  'Array': {
    VAR01: ['pippo'],
    VAR02: ['1'],
    VAR03: ['true'],
    VAR04: ['{}'],
    VAR05: ['[]'],
    VAR06: ['pluto', 'pippo', 'paperino'],
    VAR07: ['false'],
    VAR08: ['-3.4'],
    VAR09: ['0'],
    VAR10: [''],
    VAR11: [true],
    VAR12: [false],
    VAR13: [0],
    VAR14: [1],
    VAR15: [-5.6],
    VAR16: [{}],
    VAR17: [[]],
    VAR18: [CONF.VAR18],
    VAR19: TypeError,
    VAR20: TypeError,
    NonExistentKey: TypeError,
  },
  'Number': {
    VAR01: TypeError,
    VAR02: 1,
    VAR03: TypeError,
    VAR04: TypeError,
    VAR05: TypeError,
    VAR06: TypeError,
    VAR07: TypeError,
    VAR08: -3.4,
    VAR09: 0,
    VAR10: TypeError,
    VAR11: TypeError,
    VAR12: TypeError,
    VAR13: 0,
    VAR14: 1,
    VAR15: -5.6,
    VAR16: TypeError,
    VAR17: TypeError,
    VAR18: TypeError,
    VAR19: TypeError,
    VAR20: TypeError,
    NonExistentKey: TypeError,
  },
};

var conf = getConfigurationFrom(CONF);

function generateForUndefinedTest(method, key, expected) {
  if (expected === TypeError) {
    it('should return undefined for ' + key, function() {
      assert.deepEqual(conf[method](key), undefined);
    });
  } else {
    if (process.env.running_under_istanbul && /^function/.test(expected)) return;
    it('should return the correct value with ' + key, function() {
      assert.deepEqual(conf[method](key), expected);
      assert.deepEqual(typeof conf[method](key), typeof expected);
    });
  }
}

function generateForThrowTest(method, type, key, expected) {
  var block = function() {
    return conf[method](key);
  };
  if (expected === TypeError) {
    it('should throw for ' + key, function() {
      assert.throws(block, TypeError, new RegExp(type + '$', 'i'));
    });
  } else {
    it('should not throw for ' + key, function() {
      assert.doesNotThrow(block);
    });
    if (process.env.running_under_istanbul && /^function/.test(expected)) return;
    it('should return the key ' + key, function() {
      assert.deepEqual(block(), expected);
      assert.deepEqual(typeof conf[method](key), typeof expected);
    });
  }
}

function generateForUndefinedDescribe(type) {
  var method = 'getAs' + type + 'OrUndefined';
  describe(method, function() {
    for (var key in TYPES[type]) {
      var expected = TYPES[type][key];
      generateForUndefinedTest(method, key, expected);
    }
  });
}

function generateForThrowDescribe(type) {
  var method = 'getAs' + type + 'OrThrow';
  describe(method, function() {
    for (var key in TYPES[type]) {
      var expected = TYPES[type][key];
      generateForThrowTest(method
        , type, key, expected);
    }
  });
}

describe('confenv', function() {
  it('should return an object', function() {
    assert.ok(conf instanceof Object);
  });

  Object.keys(TYPES).forEach(function(type) {
    ['Undefined', 'Throw'].forEach(function(postfix) {
      var method = 'getAs' + type + 'Or' + postfix;
      it('should return an object with ' + method + ' method', function() {
        assert.ok(conf[method] instanceof Function);
      });
    });
  });

  for (var type in TYPES) {
    generateForUndefinedDescribe(type);
    generateForThrowDescribe(type);
  }

  describe('getConfigurationFromEnvironment', function() {
    var conf = confenv.getConfigurationFromEnvironment();

    Object.keys(TYPES).forEach(function(type) {
      ['Undefined', 'Throw'].forEach(function(postfix) {
        var method = 'getAs' + type + 'Or' + postfix;
        it('should return an object with ' + method + ' method', function() {
          assert.ok(conf[method] instanceof Function);
        });
      });
    });
  });
});