const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    compress: true,
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
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
  // plugins: [
  //   // 플러그인 인스턴스 생성
  //   new CleanWebpackPlugin({
  //     // 플러그인 옵션 셜정
  //     // dry 기본 값: false
  //     // dry: true,
  //     // verbose 기본 값: false
  //     verbose: true,
  //     // cleanOnceBeforeBuildPatterns 기본 값: ['**/*']
  //     cleanOnceBeforeBuildPatterns: [
  //       "**/*",
  //       // dist 폴더 안의 모든 것을 지우도록 설정
  //       path.resolve(process.cwd(), "dist/**/*"),
  //     ],
  //   }),
  // ],
};
