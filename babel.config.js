const prodPlugins = [
  // ['import', {
  //   libraryName: 'vant',
  //   libraryDirectory: 'es',
  //   style: true
  // }, 'vant'],
]

if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [...prodPlugins]
}