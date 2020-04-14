// 存放 prod 配置
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
// 基本配置
const common = require('./webpack.base.js');
// 打包之前清除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let MiniCssExtractPlugin=require("mini-css-extract-plugin");
module.exports = merge(common, {
        mode: 'production',
        output: {
            filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
            path: path.resolve(__dirname, '../dist')
        },
        module: {},
        plugins: [
               /* 提取单独打包css文件 */
        new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CleanWebpackPlugin() //打包前先清空
        ]

})