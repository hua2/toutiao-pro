const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          'primary-color': '#222',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  publicPath: '/admin/',
  devServer: {
    port: 8000,
    proxy: 'https://www.fastmock.site/mock/a0bd9f5bd79a1872a56580697c282950/toutiao'
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}
module.exports = vueConfig
