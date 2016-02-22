gulp-toolbox-test-node-jasmine
==============================

[![Build Status](https://travis-ci.org/Xiphe/gulp-toolbox-test-node-jasmine.svg?branch=master)](https://travis-ci.org/Xiphe/gulp-toolbox-test-node-jasmine)
[![bitHound Overall Score](https://www.bithound.io/github/Xiphe/gulp-toolbox-test-node-jasmine/badges/score.svg)](https://www.bithound.io/github/Xiphe/gulp-toolbox-test-node-jasmine)
[![bitHound Dependencies](https://www.bithound.io/github/Xiphe/gulp-toolbox-test-node-jasmine/badges/dependencies.svg)](https://www.bithound.io/github/Xiphe/gulp-toolbox-test-node-jasmine/master/dependencies/npm)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

test [toolbox](https://github.com/Xiphe/gulp-toolbox-registry) for nodejs using [jasmine](http://jasmine.github.io/)


Supports
--------

 - [gulp-toolbox-pipe-coverage-istanbul](https://github.com/Xiphe/gulp-toolbox-pipe-coverage-istanbul)

Config
------

 - ### `files.library:String`: `lib/**/*.js`

   glob of all library files that should be tested

 - ### `files.test.node.specs:Array<String>`: `['test/node/**/*Spec.js']`

   array of globs pointing to spec files
 
 - ### `test.node.jasmine.preloadLibrary:Boolean`: `true`

   weather or not the library files should be loaded even if
   the they're not required in the spec files

   this is required for accurate coverage reports since
   a library file will not be part of a report if it's not required

   this might have side-effects on script files that execute stuff
   on require


License
-------

> The MIT License
> 
> Copyright (C) 2016 Hannes Diercks
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
