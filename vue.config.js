module.exports = {
  // publicPath: '/moire/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/scss/main.scss";
            `
      }
    }
  }
}
