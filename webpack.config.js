const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require("node-sass-glob-importer");
const { readdirSync } = fs;

module.exports = (_env, argv) => {
  const isDev = argv.mode !== "production";
  let themes = {};
  readdirSync("./src/styles").forEach((value) => {
    themes = {
      ...themes,
      [value.replace(".scss", "")]: `./src/styles/${value}`,
    };
  });
  return {
    mode: process.NODE_ENV || "development",
    entry: {
      "index.js": "./src",
      ...themes,
    },
    target: "node",
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      filename: "[name]",
      path: path.resolve(__dirname, "dist"),
      pathinfo: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: { publicPath: "dist" },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  importer: globImporter(),
                },
              },
            },
          ],
        },
        {
          test: /\.node$/,
          use: [
            {
              loader: "native-addon-loader",
              options: { name: "[name]-[hash].[ext]" },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles/[name].css",
      }),
    ],
  };
};
