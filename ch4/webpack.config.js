module.exports = {
  devTool: "eval-source-map",

  entry: __dirname + "/app/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
      }
    ]
  },

  devServer: {
    contentBase: "./public",
    colors: true,
    inline: true,
    historyApiFallback: true
  }
};
