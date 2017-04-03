const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.js',
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: '[name].min.js',
        publicPath: '/assets',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'Draw',
    },
    module: {
      rules: [
          {
              enforce: 'pre',
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'eslint-loader',
          },
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: 'babel-loader',
          },
      ],
    },
    devServer: {
        host: '127.0.0.1',
        port: 8888,
        contentBase: path.resolve(__dirname, './src'),
    },
};
