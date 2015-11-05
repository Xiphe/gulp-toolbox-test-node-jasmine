'use strict';

var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig(JSON.parse(process.argv[2]));

jasmine.execute();
