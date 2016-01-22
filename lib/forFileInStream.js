'use strict';

const path = require('path');

module.exports = function forFileInStream(action) {
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
};
