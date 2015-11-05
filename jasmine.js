'use strict';

const CONFIG_PARAMETER_POSITION = 2;
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig(JSON.parse(process.argv[CONFIG_PARAMETER_POSITION]));

jasmine.execute();
