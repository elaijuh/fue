module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3030',
        ws: true,
      },
    },
  },

  lintOnSave: false,
}
