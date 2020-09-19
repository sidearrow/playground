'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetPlugin = require('optimize-css-assets-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = function (env, argv) {
  const mode = argv.mode;
  const isEnvDevelopment = mode === 'development';
  const isEnvProduction = mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      filename: 'index.js',
      path: DIST_DIR,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        hash: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      isEnvProduction && new OptimizeCSSAssetPlugin(),
    ].filter(Boolean),
  };
};
