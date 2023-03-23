const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  productionSourceMap: false,
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
    },
  },
  // configureWebpack: (config) => {
  //   config.resolve = {
  //     alias: {
  //       "@": resolve("packages"),
  //     },
  //   };
  // },
  chainWebpack: (config) => {
    // config.optimization.delete("splitChunks");
    // config.plugins.delete("copy");
    // config.plugins.delete("html");
    // config.plugins.delete("preload");
    // config.plugins.delete("prefetch");
    // config.plugins.delete("hmr");
    // config.entryPoints.delete("app");

    config.module
      .rule("js")
      .include.add("/packages")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        // 修改它的选项...
        return options;
      });
  },
});
