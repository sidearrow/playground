const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function (env, argv) {
  const mode = argv.mode === "production" ? "production" : "development";

  const isEnvDevelopment = mode === "development";
  const isEnvProduction = mode === "production";

  return {
    entry: "./src/index.tsx",
    devtool: "source-map",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        hash: true,
      }),
      isEnvProduction && new OptimizeCSSAssetPlugin(),
    ].filter(Boolean),
    devServer: {
      historyApiFallback: true,
    },
  };
};
