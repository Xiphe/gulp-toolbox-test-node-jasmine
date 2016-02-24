/* eslint no-param-reassign: 0 */
'use strict';

module.exports = {
  name(name, target) {
    target.displayName = name;

    return target;
  },
  noStack(target) {
    target.showStack = false;
    return target;
  },
};
