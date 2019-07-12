const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill', // enables async-await
    path.join(__dirname, 'src', 'client', 'index.js')],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        loader: 'babel-loader'
      }
    ]
  }
}