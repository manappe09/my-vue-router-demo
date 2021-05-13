const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js", // 基準となるエントリーポイントの指定
  output: {
    // 出力先に関する情報を指定
    path: `${__dirname}/dist`, // パスの場所を指定
    filename: "main-[contenthash].js",
  },
  mode: "development", // ソースマップの有効/無効
  devServer: {
    // 開発用サーバーの設定
    contentBase: "dist",
    open: true, // trueにすることで自動的にブラウザが立ち上がる
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name]-[hash].[ext]", // renameについて。ext = extention
          outputPath: "images", // どのファイルに書き出すか
          publicPath: "images", // 画像を他のサーバーに置いている場合はそのURLをここに記載。
        },
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          MiniCssExtractPlugin.loader, // cssファイルをjsから分離する。この位置じゃないとエラー吐いた。
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  target: ["web", "es5"],
};
