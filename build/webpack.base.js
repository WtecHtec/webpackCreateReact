const path = require('path');
let webpack=require('webpack');
let HtmlWebpackPlugin=require('html-webpack-plugin');	// 引入插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ThemePlugin = require('@alifd/next-theme-webpack-plugin');

module.exports = {
    entry: './src/index.js',
     /*----以下是新增loader的代码----*/
    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                exclude:/(node_modules)/,  //排除掉nod_modules,优化打包速度
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    "url-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'fast-sass-loader',
                        {
                            // 添加 @alifd/next-theme-loader，引入自定义主题样式对应的 scss 变量
                            loader: '@alifd/next-theme-loader',
                            options: {
                                theme: '@alifd/theme-1212',
                                // 基准包，默认是@alifd/next
                                base: '@alifd/next',
                                // 注入变量，来编译组件样式
                                // 支持 Object 和 String ， 如果是 String 请写绝对路径 例如: modifyVars: path.join(__dirname, 'variable.scss')
                                // 以下为Object
                                modifyVars: {
                                    '$css-prefix': '"myprefix-"',
                                },
                            },
                        },
                    ],
                }),
            },
        ]
    },

    /*----以下是新增插件的代码----*/
    plugins: [
       //  添加 @alifd/next-theme-webpack-plugin，引入 normalize 样式以及自定义 icon 定义
         new ThemePlugin({
            theme: '@alifd/theme-1212',
            // 基准包，默认是@alifd/next
            libraryName: '@alifd/next',
            // 是否将内置的normalize样式添加到最终的样式包中，默认为true
            prependNormalizeCSS: true,
            // 注入变量，来编译normalize和icon样式
            // 支持 Object 和 String ， 如果是 String 请写绝对路径 例如: modifyVars: path.join(__dirname, 'variable.scss')
            // 以下为Object
            modifyVars: {
                '$css-prefix': '"myprefix-"',
            },
        }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: path.resolve(__dirname, '../dist/index.html'),
            hash: true,         //会在打包好的bundle.js后面加上hash串
            minify:{ //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            },
        }),
      
    ]
};
