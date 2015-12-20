'use strict';

var meta = require('./package');

const annotate = (name, target) => {
  target.displayName = name;

  return target;
};

module.exports = {
  meta,
  config: {
    'files.library': {
      as: 'library',
      default: 'lib/**/*.js'
    },
    'files.test.node.specs': {
      as: 'spec_files',
      default: ['test/node/**/*Spec.js']
    },
    'files.test.node.helpers': {
      as: 'helpers',
      default: ['']
    }
  },
  getTask(undertaker) {
    const config = this.config;

    config['spec_dir'] = '';

    return undertaker.series(
      'optional:coverage:istanbul',
      annotate('executeTestNodeJasmine', (done) => {
        const Jasmine = require('jasmine');
        const jasmine = new Jasmine();

        jasmine.loadConfig(config);
        jasmine.onComplete((passed) => {
          if (!passed) {
            return done(new Error('jasmine specs did not pass'));
          }

          done();
        });
        jasmine.execute();
      })
    );
  }
};
