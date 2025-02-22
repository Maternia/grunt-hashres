/*
 * grunt-hashres
 * https://github.com/luismahou/grunt-hashres
 *
 * Copyright (c) 2013 Luismahou
 * Licensed under the MIT license.
 */

'use strict';

var vows = require('vows'),
    assert = require('assert'),
    utils = require('../tasks/hashresUtils');

vows.describe('Hashres Utils').addBatch({
  'creates formatter for': {
    topic: utils,
    '${hash}.${ext}': {
      topic: function(utils) {
        return utils.compileFormat('${hash}.${ext}'); },
      'that renames to hash.js': function(formatter) {
        assert.equal('123.js', formatter({ hash: '123', ext: 'js' }));
      },
      'that renames to hash.png': function(formatter) {
        assert.equal('456.png', formatter({ hash: '456', ext: 'png' }));
      }
    },
    '${hash}.${name}.cache.${ext}': {
      topic: function(utils) {
        return utils.compileFormat('${hash}.${name}.cache.${ext}'); },
      'that renames to hash.name.cache.js': function(formatter) {
        assert.equal(
          '123.all-scripts.cache.js',
          formatter({ hash: '123', name: 'all-scripts', ext: 'js' }));
      },
      'that renames file with multiple dots': function(formatter) {
        assert.equal(
          '123.file.with.many.dots.cache.js',
          formatter({ hash: '123', name: 'file.with.many.dots', ext: 'js' }));
      }
    },
    '${hash}.${hash}.${ext}': {
      topic: function(utils) {
        return utils.compileFormat('${hash}.${hash}.${ext}'); },
      'that renames to hash.hash.js': function(formatter) {
        assert.equal(
          '123.123.js',
          formatter({ hash: '123', ext: 'js' }));
      }
    }
  },
  'quoteReplacementString works with replace': {
    topic: utils,
    'when there\'s nothing to quote': function (utils) {
      const str = 'ccc';
      assert.equal(str, 'abb'.replace(/a(.+)/, utils.quoteReplacementString(str)));
    },
    'when replacement contains $': function (utils) {
      const str = 'c$c';
      assert.equal(str, 'abb'.replace(/a(.+)/, utils.quoteReplacementString(str)));
    },
    'when replacement contains $1': function (utils) {
      const str = 'c$1c';
      assert.equal(str, 'abb'.replace(/a(.+)/, utils.quoteReplacementString(str)));
    },
    'when replacement is used as part of larger string': function (utils) {
      const str = 'c$1c';
      assert.equal('c$1cbb', 'abb'.replace(/a(.+)/, utils.quoteReplacementString(str) + '$1'));
    },
  },
  'generates md5 for': {
    topic: utils,
    './fixtures/knownMd5.js': function(utils) {
      assert.equal(
        utils.md5File('./test/fixtures/knownMd5.js'),
        'd845a23e205d256a5bcfffbecb4b7c35');
    }
  }
}).export(module);