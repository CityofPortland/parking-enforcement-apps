const path = require('path');

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: ['babel-loader', '@mdx-js/vue-loader']
        }
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end();
  },
  /*chainWebpack: config => {
    config.module
      //.rule('i18n-resource')
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .test(/\.(json5?|ya?ml)$/)
      .include.add(path.resolve(__dirname, './src/locales'))
      .end()
      .type('javascript/auto')
      .use('i18n-resource')
      .loader('@intlify/vue-i18n-loader');
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end(); // cory added
  },*/
/*
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'no',
      localeDir: 'assets/locales',
      enableInSFC: true
    }
  }*/
};
