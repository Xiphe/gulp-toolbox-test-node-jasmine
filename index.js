module.exports = function(gulp) {
  'use strict';

  var spawn = require('child_process').spawn;
  var path = require('path');
  var jasmineCli = path.join(__dirname, 'jasmine.js');

  function testNodeJasmine() {
    var config = {
      'spec_dir': 'test',
      'spec_files': [
          '**/*Spec.js'
      ],
      helpers: []
    };

    return spawn('node', [jasmineCli, JSON.stringify(config)], {
      stdio: 'inherit'
    });
  }
  testNodeJasmine.description = 'execute node unit test with jasmine';

  gulp.task('test:node:jasmine', testNodeJasmine);
};
