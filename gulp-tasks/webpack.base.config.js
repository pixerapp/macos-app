'use strict';

const autoprefixer = require('autoprefixer');
const poststylus = require('poststylus');
const webpack = require('webpack');

module.exports = function () {
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: [
                  ['es2015'],
                ],
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        {
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'stylus-loader',
              options: {
                use: [
                  poststylus([
                    autoprefixer({
                      browsers: ['last 2 versions']
                    })
                  ])
                ]
              }
            }
          ],
          test: /\.styl$/
        },
        {
          test: /\.(png|jpg|ttf|eot|svg|woff(2)?)(\?[a-z0-9=\.]+)?$/,
          use: [
            { loader: 'file-loader' }
          ]
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(IS_PRODUCTION ? 'production' : 'development')
        }
      }),
    ],
    resolve: {
      alias: {}
    },
    // Configure the console output
    stats: {
      colors: true,
      modules: true,
      reasons: true
    },
    bail: true,     // Report the first error as a hard error instead of tolerating it.
    devtool: 'cheap-module-source-map',
    profile: true,  // Capture timing information for each module.
    watch: !IS_PRODUCTION
  };
};
