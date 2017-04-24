var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
module.exports = {
    stats: {
        colors: true,
        chunks: true,
        children: false
    },
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname + '/pub/',
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            // {
            //     test: /\.(less|css)$/,
            //     loader: ExtractTextPlugin.extract({
            //         use: [{
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true,
            //                 localIdentName: '[name]_[local]-[hash:base64:5]'
            //             }
            //         }, {
            //             loader: 'less-loader'
            //         }]
            //     })
            // },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader'
            //     })
            // },
            { test: /\.css$/, loader:ExtractTextPlugin.extract({
                                        fallback: 'style-loader',
                                        use: 'css-loader?modules' 
                                        })},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader']
            //     })
            // },
            // {
            //     test: /\.(png|jpg|ico)$/,
            //     loader: 'url-loader?limit=10000&name=img/[name].[hash:8].[ext]'
            // },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            //     loader: 'file-loader'
            // },
            {　　　　　　
                test: /\.(png|jpg)$/,
                loader: 'file-loader?limit=8192&name=images/[hash:8].[name].[ext]'　　　　
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: "./pub/"
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: 'html-withimg-loader!' + './index.html'
        }),
        new TransferWebpackPlugin([]),
        new webpack.DllReferencePlugin({
            context: __dirname + '/pub/',
            manifest: require("./pub/bundle.manifest.json"),
        }),
    ]
}