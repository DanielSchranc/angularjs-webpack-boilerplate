const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rules = [
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [
            ['@babel/plugin-transform-runtime', { corejs: 2 }],
            ['angularjs-annotate', { explicitOnly: false }],
            'lodash'
          ],
          presets: ['@babel/preset-env']
        }
      }
    ],
    include: [
      path.join(__dirname, 'src')
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
  new webpack.ProgressPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new HtmlWebpackPlugin({
    minify: false,
    template: path.join(__dirname, 'src/template/index.html'),
    inject: 'body',
    hash: false
  })
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
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
    quiet: false,
    port: 4000,
    historyApiFallback: true,
    stats: {
      chunks: false,
      chunkModules: false
    }
  },
  entry: {
    app: ['./src/app/root.module.js']
  },
  output: {
    filename: '[name].bundle-[hash]-[id].js',
    chunkFilename: '[name].chunk-[hash]-[id].js',
    sourceMapFilename: '[name].bundle-[hash]-[id].map',
    path: path.join(__dirname, 'build')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        ie8: false,
        mangle: true,
        toplevel: false,
        compress: {
          booleans: true,
          conditionals: true,
          dead_code: true,
          drop_debugger: true,
          drop_console: true,
          evaluate: true,
          sequences: true,
          unused: true,
          warnings: false
        },
        output: {
          comments: false,
          beautify: false,
        }
      }
    })]
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
    modules: ['node_modules', __dirname]
  },
  plugins
};
