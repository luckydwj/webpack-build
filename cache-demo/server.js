/**
 *  Created by daiwenjuan on 2021/1/16 17:18.
 */
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config01.js");
const compiler = webpack(config);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config01.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log("Example app listening on port 3000!\n");
});
