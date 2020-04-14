// webpack.dev.js
// 存放 dev 配置
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,
        inline: true,
        port: 3000,
        open: true,
    },
    output: { // 输出
        filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
        path: path.resolve(__dirname, '../dist')
    },
    // output: {
    //     //添加hash可以防止文件缓存,每次都会生成4位hash串
    //     filename: 'bundle.[hash:4].js',
    //     path: path.resolve('dist')
    // },
    module: {},
    mode: 'production',
});