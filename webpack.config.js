const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    popup: './src/popup.js',
    options: './src/options.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};