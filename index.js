'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var jasmineCli = path.join(__dirname, 'jasmine.js');

module.exports = function testNodeJasmineFactory(requestConfig) {
  var config = requestConfig({
    'files.test.node.specs': {
      as: 'spec_files',
      default: ['test/node/**/*Spec.js']
    },
    'files.test.node.helpers': {
      as: 'helpers',
      default: ['']
    }
  });

  config['spec_dir'] = '';

  function testNodeJasmine() {
    return spawn('node', [jasmineCli, JSON.stringify(config)], {
      stdio: 'inherit'
    });
  }
  testNodeJasmine.description = 'execute node unit test with jasmine';

  return testNodeJasmine;
};
