module.exports = function(gulp, hook) {
  'use strict';

  hook.add('test', 'test-node-jasmine');
  hook.add('pre-release', 'test-node-jasmine');

  gulp.task(
    'test-node-jasmine',
    'execute node unit test with jasmine',
    function() {
      var Jasmine = require('jasmine');
      var jasmine = new Jasmine();

      jasmine.loadConfig({
        'spec_dir': 'test',
        'spec_files': [
            '**/*Spec.js'
        ],
        helpers: []
      });

      jasmine.execute();
    }
  );

};
