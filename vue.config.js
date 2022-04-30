/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')  // __dirname:当前目录

    // 配置 module
    config.module
      .rule('svg-sprite')  // 规则
      .test(/\.svg$/)  // 文件特点
      .include.add(dir).end() // 只包含 dir 目录，即 icon 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()  // 使用 svg-sprite-loader，并添加选项 options，extract: false 的意思是不用解释出文件。
      .use('svgo-loader').loader('svgo-loader')
    // .tap(options => ({ ...options, plugins: [{ removeAttrs: { attrs: 'fill' } }] })).end()  // 使用 svgo-loader，删除 fill，优化代码。

    // 配置插件
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])

    // 其他 svg loader 排除 icons 目录
    config.module.rule('svg').exclude.add(dir)
  }
}


JSON.stringify