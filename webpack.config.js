const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: ['./app/react/index.js'],
  },
  output: {
    path: path.join(__dirname, '/app/assets/javascripts'),
    filename: 'react_bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('css!sass'),
      },
      {
        test: /\.ya?ml$/,
        loaders: ['json-loader', 'yaml-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.js.jsx'],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '../stylesheets/react_bundle.css', allChunks: true,
    }),
  ],
};
