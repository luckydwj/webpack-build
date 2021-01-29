/**
 *  Created by daiwenjuan on 2021/1/29 16:12.
 */
const path = require("path");
module.exports = {
  entry: {
    share: {
      import: "./src/share.js",
      filename: "share.js",
    },
    demo1: {
      import: "./src/demo1.js",
      filename: "demo1.js",
      dependOn: "share",
    },
    demo: {
      import: "./src/demo.js",
      filename: "demo.js",
      dependOn: "share",
    },
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
