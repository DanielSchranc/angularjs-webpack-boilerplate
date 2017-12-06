const cwd = process.cwd();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rules = [
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
    test: /\.(html)$/,
    use: [{
      loader: 'html-loader',
      options: {
        minimize: false,
        collapseWhitespace: false
      }
    }]
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
];

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.context && /node_modules/.test(module.context),
    filename: '[name].bundle-[hash]-[id].js'
  }),
  new HtmlWebpackPlugin({
    minify: false,
    template: path.join(__dirname, 'src/template/index.html'),
    inject: 'body',
    hash: false
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        unused: true,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true,
        sequences: true,
        booleans: true,
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  );
}

module.exports = {
  cache: true,
  context: __dirname,
  performance: {
    hints: false
  },
  devtool: 'sourcemap',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    inline: true,
    hot: true,
    quiet: true,
    port: 4000,
    historyApiFallback: true,
    stats: {
      chunks: false,
      chunkModules: false
    }
  },
  entry: {
    app: ['./src/root.module.js']
  },
  output: {
    filename: '[name].bundle-[hash]-[id].js',
    chunkFilename: '[name].chunk-[hash]-[id].js',
    sourceMapFilename: '[name].bundle-[hash]-[id].map',
    path: path.resolve(cwd, 'build')
  },
  module: {
    rules
  },
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', cwd]
  },
  plugins
};
