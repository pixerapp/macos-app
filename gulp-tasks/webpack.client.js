'use strict';

const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackStream = require('webpack-stream');

const baseConfig = require('./webpack.base.config')();

module.exports = function () {
  const { BUILD_DIR, SRC_DIR } = this.opts;
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';
  const MAIN_FILE_PATH = path.join(SRC_DIR, 'react', 'index.js');
  // Webpack Dev Server port.
  const host = 'localhost';
  const port = 8080;
  const WEBPACK_DEV_SERVER_ADDRESS = `http://${host}:${port}`;
  const publicPath = WEBPACK_DEV_SERVER_ADDRESS + '/dist/';

  let config = Object.assign({
    entry: {
      app: [
        // Activate HMR for React
        // 'react-hot-loader/patch',
        // Bundle the client for webpack-dev-server
        // and connect to the provided endpoint.
        `webpack-dev-server/client?${WEBPACK_DEV_SERVER_ADDRESS}`,
        // Bundle the client for hot reloading.
        // `only-` means to only hot reload for successful updates.
        'webpack/hot/only-dev-server',
        path.join(SRC_DIR, 'react', 'index.js')
      ],
    },
    output: {
      filename: '[name].js',
      path: BUILD_DIR,
      publicPath,
    },
    context: SRC_DIR,
    target: 'electron-renderer',
  }, baseConfig);

  if (!IS_PRODUCTION) {
    // config.module.rules[0].loader.unshift('react-hot-loader');
    config.module.rules[0].use[0].query.presets.push(
      // Specifies what level of language features to activate.
      // Stage 2 is "draft", 4 is finished, 0 is strawman.
      // See https://tc39.github.io/process-document/
      'stage-2',
      // Transpile React components to JavaScript
      'react',
      'react-hmre'
    );
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      // Prints more readable module names in the browser console on HMR updates.
      new webpack.NamedModulesPlugin()
    );

    const compiler = webpack(config);

    const webpackDevServerOptions = {
      // Set this if you want to enable gzip compression for assets
      compress: true,
      hot: true,
      inline: true,
      publicPath,
      stats: {
        colors: true
      },
    };

    // Start a webpack-dev-server.
    new WebpackDevServer(compiler, webpackDevServerOptions).listen(port, host, err => {
      if (err) {
        gutil.error(err);

        throw new gutil.PluginError('webpack-dev-server', err);
      }

      // Server listening
      gutil.log(`webpack-dev-server is listening on ${WEBPACK_DEV_SERVER_ADDRESS}`);
    });
  }

  return this.gulp
    .src(MAIN_FILE_PATH)
    .pipe(webpackStream(config, webpack))
    .pipe(this.gulp.dest(BUILD_DIR));
};
