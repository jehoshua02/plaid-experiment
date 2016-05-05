var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlPlugin({
      title: 'Plaid Experiment',
      favicon: path.resolve(__dirname, './src/favicon.ico')
    })
  ]
}
