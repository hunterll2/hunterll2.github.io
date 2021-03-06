/*
Problem:
1. must use <base href="../"> in wiki folder element to have access to imgs
2. also imgs in css files not work at all (must include / or ../ in base tag)
3. i must declare fonts and 3rd party script in the template

for now:
i will hardcode the template and css files to using img from extranal path
*/

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

module.exports = {
    entry: {
        home: "./src/js/home.js",
        wiki: "./src/js/wiki.js"
    },
    output: {
        filename: "./scripts/[name].bundle.js",
        path: path.resolve(__dirname)
    },
    devtool: "inline-source-map",
    devServer: {contentBase: path.resolve(__dirname)},
    plugins: [
        new MiniCssExtractPlugin({filename: "./styles/[name].bundle.css"}),
        new HtmlWebpackPlugin({
            title: "Games Guide | Home",
            template: "./src/template/home.html",
            excludeAssets: [/wiki.bundle.js/, /wiki.bundle.css/]
        }),
        new HtmlWebpackPlugin({
            filename: "./wiki/index.html",
            title: "Games Guide | Wiki",
            template: "./src/template/wiki.html",
            excludeAssets: [/home.bundle.js/, /home.bundle.css/]
        }),
        new HtmlWebpackPlugin({
            filename: "./wiki/bloodborne/index.html",
            title: "Games Guide | Bloodborne",
            template: "./src/template/wiki.html",
            excludeAssets: [/home.bundle.js/, /home.bundle.css/]
        }),
        new HtmlWebpackExcludeAssetsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    }
}