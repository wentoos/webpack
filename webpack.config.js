const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//将css打包到文件夹内
const jquery = require('jquery');
const HtmlWebpackPlugin = require('html-webpack-plugin');//HtmlWebpackPlugin简化了HTML文件的创建，以便为您的webpack包提供服务
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js',
        publicPath:'build/'//指定文件公共地址
    },
    watch:true,
    devtool: "source-map",//报错在源文件
    module: {
      rules: [
        {test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },//use webpack2的写法
        {test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['postcss-loader', 'less-loader']
            })
        },
        {test: /\.css$/,use: ExtractTextPlugin.extract({fallback: "style-loader",use: "postcss-loader"})},
        {test: require.resolve('jquery'),use: [{loader: 'expose-loader',options: '$'}]},//使jq暴露在全局作用域下
        {test: /\.(jpe?g|png)$/,use:'file-loader'}//图片打包工具
      ]
  },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              drop_console: false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: 'template/index.html',
            filename: path.resolve(__dirname,'index.html')
        })
    ]
}
