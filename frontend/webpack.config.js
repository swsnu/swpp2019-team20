module.exports = {
  devServer: {
    proxy: {
      '/account': 'http://loaclhost:8000',
      '/loan': 'http://localhost:8000',
    },
  },
};
