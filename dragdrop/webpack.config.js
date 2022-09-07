const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "[hash].bundle.js",
    // 프로젝트 절대결로에 번들파일을 생성
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  // ts-map파일의 디버깅용
  devtool: "inline-source-map",
  module: {
    rules: [
      // ts로더
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // css 로더
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
