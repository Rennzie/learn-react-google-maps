const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const dotenv = require('dotenv');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  const { PLATFORM } = envKeys;

  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        filename: '[name].bundle.js',
        // chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/'
      },
      resolve: { extensions: ['.mjs', '.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' }
          },
          {
            test: /\.css$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.scss$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html'
        }),
        new webpack.DefinePlugin(envKeys),
        new CopyWebpackPlugin([{ from: 'src/assets' }])
      ]
    }
  ]);
};
