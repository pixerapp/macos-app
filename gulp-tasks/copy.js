'use strict';

const path = require('path');

module.exports = function () {
  const { BUILD_DIR, SRC_DIR } = this.opts;

  const html = this.gulp
    .src([
      path.join(SRC_DIR, '*.html')
    ])
    .pipe(this.gulp.dest(BUILD_DIR));

  return html;
};
