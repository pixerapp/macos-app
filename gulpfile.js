'use strict';

const path = require('path');

// These options will be passed to each task as `this.opts`.
// Loads tasks from `gulp-tasks` by default.
require('gulp-task-loader')({
  BUILD_DIR: path.join(__dirname, 'dist'),
  NODE_MODULES: path.join(__dirname, 'node_modules'),
  ROOT_DIR: __dirname,
  SRC_DIR: path.join(__dirname, 'src'),
});
