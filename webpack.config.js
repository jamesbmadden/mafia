var path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(mp4|jpe?g)$/i, exclude: /node_modules/, use: [
        {
          loader: 'url-loader',
          options: {
            limit: 17000,
          }
        }
      ]},
    ]
  }  
};