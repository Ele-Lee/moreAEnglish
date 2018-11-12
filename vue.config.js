const path = require('path')
const baseUrl = process.env.NODE_ENV === 'production' ? 'http://24haowan-cdn.shanyougame.com/dingzhi/langQin/' : '/'
module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?'/production-sub-path/':'/',
   */
  // 基本路径
  baseUrl,
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: '.',

  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  //如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
      sass: {
        data: `$ENV: "${process.env.NODE_ENV}";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // webpack配置
  // 简单的配置方式
  configureWebpack: (config) => {
  },
  // 链式操作
  chainWebpack: config => {
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/styles/*.less'),
      ]
    }
  }
}
