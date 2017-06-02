const config = require('../mina-config')
const { resolve } = require('path')
const webpack = require('webpack')
const r = url => resolve(__dirname, url)
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: '[name].wxss'
})

module.exports = {
  devtool: false,
  output: {
    path: r('./dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      utils: r('../utils/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              "env", { 
                modules: false 
              }
            ]
          ]
        }
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true
              }
            },
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          path: r('../'),
          dist: './dist'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
      { from: { glob: 'pages/**/*.json' }, 
        to: ''
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new ProgressBarPlugin()
  ]
}