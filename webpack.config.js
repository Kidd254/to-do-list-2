const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
     index: {

      import: './src/index.js',

      dependOn: 'shared',

    },

    output: {

      import: './src/output.js',

      dependOn: 'shared',

    },

    shared: './src/style.css',
  },
  devtool: 'inline-source-map',

  devServer: {

    static: './dist',

  },

  plugins: [

    new HtmlWebpackPlugin({

      template: './src/index.html',
      title: 'Development',

    }),

  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {

    runtimeChunk: 'single',

  },
  module: {

    rules: [

      {

        test: /\.css$/i,

        use: ['style-loader', 'css-loader'],

      },
      {

        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: 'asset/resource',

      },

    ],

  },

};
