module.exports = {
  devtool: "eval-source-map",

  entry: __dirname + "/app/App.js",

  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
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
