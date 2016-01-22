'use strict';

const meta = require('./package');
const annotate = require('./lib/annotate');
const forFileInStream = require('./lib/forFileInStream');

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
    },
    'test.node.jasmine.preloadLibrary': {
      as: 'preload',
      default: true
    }
  },
  getTask(gulp) {
    const clearRequire = require('clear-require');
    const through = require('through2');
    const Jasmine = require('jasmine');
    const Reporter = require('jasmine-terminal-reporter');
    const config = this.config;
    const clearCache = forFileInStream(clearRequire);
    const preloadLibrary = forFileInStream(require);

    const executeJasmine = (cb) => {
      const jasmine = new Jasmine();

      jasmine.addReporter(new Reporter({
        isVerbose: true
      }));
      jasmine.loadConfig(config);
      jasmine.onComplete((passed) => {
        if (!passed) {
          return cb(annotate.noStack(new Error('jasmine specs did not pass')));
        }

        cb();
        process.emit('coverage:istanbul:report');
      });
      jasmine.execute();
    };

    config['spec_dir'] = '';

    return gulp.series(
      'optional:coverage:istanbul?watch=false',
      annotate.name('executeTestNodeJasmine', () => {
        const exc = (cb) => {
          if (config.preload) {
            gulp.src(config.library)
              .pipe(through.obj(preloadLibrary, () => {
                executeJasmine(cb);
              }));
          } else {
            executeJasmine(cb);
          }
        };

        return gulp.src(config.spec_files)
          .pipe(through.obj(clearCache, exc));
      })
    );
  }
};
