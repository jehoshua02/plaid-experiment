var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    index: path.resolve(__dirname, './src/index')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title: 'Plaid Experiment',
      favicon: path.resolve(__dirname, './src/favicon.ico')
    })
  ]
}
