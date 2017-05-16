const path = require('path');
const webpack = require('webpack');
const jquery = require('jquery');
const HtmlWebpackPlugin = require('html-webpack-plugin');//HtmlWebpackPlugin简化了HTML文件的创建，以便为您的webpack包提供服务
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build/bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 9000,
    },
    devtool: "source-map",//报错在源文件
    module: {
      rules: [
        {test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },//use webpack2的写法
        {test: /\.less$/,use: ['style-loader','postcss-loader', 'less-loader']},
        {test: /\.css$/,use: [ "style-loader", "postcss-loader"]},
        {test: require.resolve('jquery'),use: [{loader: 'expose-loader',options: '$'}]},//使jq暴露在全局作用域下
        {test: /\.(jpe?g|png)$/,use:'file-loader'}//图片打包工具
      ]
  },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:9000' })
    ]
}
