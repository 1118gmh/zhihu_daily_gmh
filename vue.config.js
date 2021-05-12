module.exports = {
  lintOnSave: false,
  devServer: {
    // 跨域请求：PROXY代理
    proxy: {
      '/': {
        target: 'http://news-at.zhihu.com/api/4',
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme',
        ],
      },
    },
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
};
