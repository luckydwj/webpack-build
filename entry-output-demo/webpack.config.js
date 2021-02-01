/**
 *  Created by daiwenjuan on 2021/1/29 16:12.
 */
const path = require("path");
module.exports = function (env, argv) {
  console.log("===env.production=========",env)
  return {
    mode: env.production ? "production" : "development",
    //entry: {
    //  share: {
    //    import: "./src/share.js",
    //    filename: "share.js",
    //  },
    //  demo1: {
    //    import: "./src/demo1.js",
    //    filename: "demo1.js",
    //    dependOn: "share",
    //  },
    //  demo: {
    //    import: "./src/demo.js",
    //    filename: "demo.js",
    //    dependOn: "share",
    //  },
    //},
    entry: {
      demo: "./src/demo.js",
      demo1: "./src/demo1.js",
    },
    output: {
      filename: "[name][hash].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
  };
};
