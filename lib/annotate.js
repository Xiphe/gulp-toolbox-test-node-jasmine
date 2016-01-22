'use strict';

exports.name = (name, target) => {
  target.displayName = name;

  return target;
};

exports.noStack = (target) => {
  target.showStack = false;
  return target;
};
