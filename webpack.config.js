/*
 * @Descripttion: webpack打包配置文件
 * @Author: xutao
 * @Date: 2020-11-05 10:24:57
 * @LastEditors: xutao
 * @LastEditTime: 2020-11-05 17:28:02
 * @FilePath: \webgl-practice\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/app.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    resolve:{
        extensions:['.ts', '.js', '.json', '.png'],	//表示在import 文件时文件后缀名可以不写
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({ template: './index.html' }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "images"),
                to: path.resolve(__dirname, "dist", "images"),
            }]
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src')
    }
};