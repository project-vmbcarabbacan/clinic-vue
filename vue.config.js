const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/socket.io': {
        target: process.env.VUE_APP_API_URL,
        ws: true,
      },
    },
  },
});
