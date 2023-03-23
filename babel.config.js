module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // [
    //   "import",
    //   {
    //     libraryName: "element-ui",
    //     styleLibraryName: "theme-chalk",
    //     libraryDirectory: "es",
    //     style: (name) => {
    //       return `${name}/style.css`;
    //     },
    //   },
    // ],
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
