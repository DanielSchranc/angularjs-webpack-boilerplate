const cwd = process.cwd();
const path = require('path');
const webpack = require('webpack');

module.exports = {
  cache: true,
  context: cwd,
  performance: {
    hints: false
  },
  devServer: {
    contentBase: cwd,
    compress: true,
    inline: true,
    hot: true,
    port: 4000,
    publicPath: '/build/',
    quiet: true,
    historyApiFallback: true,
    stats: {
      chunks: false,
      chunkModules: false
    }
  },
  devtool: 'sourcemap',
  entry: {
    app: ['./src/root.module.js']
  },
  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].js',
    path: path.resolve(cwd, 'build'),
    publicPath: '/build/',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['angularjs-annotate', { explicitOnly: false }]
              ],
              presets: ['es2015']
            }
          }
        ],
        include: [
          path.resolve(cwd, 'src')
        ],
        exclude: /node_modules/
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: './',
      manifest: require(path.resolve(cwd, 'vendor/vendor-manifest.json'))
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', cwd]
  }
};
