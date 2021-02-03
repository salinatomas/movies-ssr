const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPLugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
    "./src/frontend/index.js",
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true",
  ],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/app.js",
    publicPath: "/",
  },
  devServer: {
    open: true,
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(s*)css$/,
        use: [
          { loader: MiniCssExtractPLugin.loader },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPLugin({
      filename: "assets/app.css",
    }),
  ],
};
