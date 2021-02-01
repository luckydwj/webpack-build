/**
 *  Created by daiwenjuan on 2021/1/29 17:20.
 */
const path = require("path");
module.exports = {
  entry: "./src/index",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {},
};
