const del = require('del');

module.exports = function () {
  const { BUILD_DIR } = this.opts;

  return del(BUILD_DIR);
};
