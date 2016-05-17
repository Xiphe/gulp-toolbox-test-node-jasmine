/* eslint global-require: 0 */
'use strict';

const path = require('path');
const meta = require('./package');
const annotate = require('./annotate');

function forFileInStream(action) {
  return (file, __, cb) => {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new Error('Streaming not supported'));
      return;
    }

    action(path.resolve(file.path));
    cb(null, file);
  };
}

module.exports = {
  meta,
  config: {
    'files.library': {
      as: 'library',
      default: 'lib/**/*.js',
    },
    'files.test.node.specs': {
      as: 'specFiles',
      default: ['test/node/**/*Spec.js'],
    },
    'test.node.jasmine.preloadLibrary': {
      as: 'preload',
      default: true,
    },
  },
  get(helper) {
    const clearRequire = require('clear-require');
    const through = require('through2');
    const Jasmine = require('jasmine');
    const Reporter = require('jasmine-terminal-reporter');
    const reRequire = forFileInStream((file) => {
      clearRequire(file);
      require(file);
    });

    const executeJasmine = (specFiles, cb) => {
      const jasmine = new Jasmine();

      jasmine.addReporter(new Reporter({
        isVerbose: true,
      }));
      jasmine.onComplete((passed) => {
        if (!passed) {
          cb(annotate.noStack(new Error('jasmine specs did not pass')));
        } else {
          helper.emit('report:coverage:istanbul', cb);
        }
      });

      specFiles.pipe(through.obj(reRequire, () => {
        jasmine.execute();
      }));
    };

    return helper.series(
      annotate.name('executeTestNodeJasmine', (cb) => {
        const config = helper.getConfig();
        const libraryFiles = helper.src(config.library)
          .pipe(helper.getPipe('coverage:istanbul', { optional: true }));
        const specFiles = helper.src(config.specFiles);

        if (config.preload) {
          return libraryFiles.pipe(
            through.obj(reRequire, () => executeJasmine(specFiles, cb))
          );
        }

        return executeJasmine(specFiles, cb);
      })
    );
  },
};
