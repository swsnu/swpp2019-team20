module.exports = {
  devServer: {
    proxy: {
      '/account': 'http://loaclhost:8000'
    }
  }
};
