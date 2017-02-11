'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const baseConfig = require('./webpack.base.config')();

module.exports = function () {
  const { BUILD_DIR, SRC_DIR } = this.opts;
  const MAIN_FILE_PATH = path.join(SRC_DIR, 'main.js');

  let config = Object.assign({
    entry: {
      main: MAIN_FILE_PATH,
    },
    output: {
      filename: '[name].js',
      library: 'main',
      path: BUILD_DIR,
    },
    target: 'electron',
  }, baseConfig);

  config.module.noParse = [/node_modules/];
  
  return this.gulp
    .src(MAIN_FILE_PATH)
    .pipe(webpackStream(config, webpack))
    .pipe(this.gulp.dest(BUILD_DIR));
};
