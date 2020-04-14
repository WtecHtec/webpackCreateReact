const path = require('path');
let webpack=require('webpack');
let HtmlWebpackPlugin=require('html-webpack-plugin');	// 引入插件
let { CleanWebpackPlugin } = require('clean-webpack-plugin');	// 引入插件
module.exports = {
    entry: './src/index.js',
    output: {
        //添加hash可以防止文件缓存,每次都会生成4位hash串
        filename: 'bundle.[hash:4].js',
        path: path.resolve('dist')
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,
        inline: true,
        port: 3000,
        open: true,
    },
    
     /*----以下是新增loader的代码----*/
    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                exclude:/(node_modules)/,  //排除掉nod_modules,优化打包速度
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    },

    /*----以下是新增插件的代码----*/
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            hash: true,         //会在打包好的bundle.js后面加上hash串
        }),
        new CleanWebpackPlugin() //打包前先清空
    ]
};
