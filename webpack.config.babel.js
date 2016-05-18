import webpack from 'webpack';

const {ProvidePlugin} = webpack;
const provide = {
  'global.jQuery': 'jquery',
  'window.jQuery': 'jquery',
  '$': 'jquery',
  '_': 'lodash',
  'global._': 'lodash',
  'window._': 'lodash',
  Backbone: 'backbone',
  'global.Backbone': 'backbone',
  'window.Backbone': 'backbone'
};

export default {
  entry: [
    './index.js',
    './index.html'
  ],
  output: {
    path: 'dist',
    filename: '[name].js',
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ],
    postLoaders: [
      {
        test: require.resolve('backbone'),
        loader: 'expose?Backbone'
      },
      {
        test: require.resolve('backbone-validation'),
        loader: 'expose?Backbone.Validation!imports?define=>undefined'
      }
    ]
  },
  resolve: {
    alias: {
      underscore: 'lodash'
    }
  },
  plugins: [
    new ProvidePlugin(provide)
  ]
};
