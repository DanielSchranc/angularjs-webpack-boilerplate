const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const context = path.join(__dirname, '../');
const vendor = [
  '@uirouter/angularjs',
  'angular'
];

module.exports = {
  cache: true,
  context: context,
  devtool: 'sourcemap',
  entry: {
    vendor: vendor
  },
  performance: {
    hints: false
  },
  output: {
    filename: '[name].js',
    path: __dirname,
    library: '__[name]',
    sourceMapFilename: '[name].map'
  },
  node: {
    fs: 'empty',
    global: false,
    crypto: 'empty'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '__[name]',
      context: context
    }),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(context, 'node_modules')]
  },
  stats: false
};