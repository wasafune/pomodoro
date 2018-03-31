const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve('src'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader', 'less-loader'],
        test: /\.less$/,
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx', '.less'],
  },
  plugins: [HtmlWebpackPluginConfig],
};
