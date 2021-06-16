// vue.config.js
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')// 引入gzip压缩插件
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin') // 骨架屏
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  // 将构建好的文件输出到哪里
  outputDir: 'dist',
  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: '',
  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 生产环境 source map
  productionSourceMap: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  // 配置css
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production',
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      },
      less: {
        // `globalVars` 定义全局对象，可加入全局变量
        javascriptEnabled: true
      }
      // sass: {
      //     prependData: `@import '@/styles.scss';`
      // },
      // scss: {
      //     additionalData: `@import "@/styles.scss";`
      // },
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true // 去掉文件名中的 .module
  },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    config.resolve.symlinks(true)
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@component', resolve('src/component'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
    config.entry('main').add('babel-polyfill')
    // 开启图片压缩
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach(item => {
      item.use('style-resources-loader')
        .loader('style-resources-loader')
        .options({
          // 需要插入的文件路径
          patterns: './src/assets/css/theme.less'
          // 需要插入的文件路径数组
          // patterns: ["./path/to/vars.less", "./path/to/mixins.less"]
        })
        .end()
    })
  },
  configureWebpack: (config) => {
    // config.plugins.push(new SkeletonWebpackPlugin({
    //   webpackConfig: {
    //     entry: {
    //       app: path.join(__dirname, './src/skeleton/entry-skeleton.js')
    //     }
    //   },
    //   minimize: true,
    //   quiet: true,
    //   router: {
    //     mode: 'hash',
    //     routes: [
    //       { path: '/', skeletonId: 'skeleton1' },
    //       { path: '/about', skeletonId: 'skeleton2' }
    //     ]
    //   }
    // }))
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())
      config.plugins.push(new CompressionPlugin({ // gzip压缩配置
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      }))
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    // 配置多个代理
    proxy: {
      '/api': {
        target: 'https://www.mock.com',
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
