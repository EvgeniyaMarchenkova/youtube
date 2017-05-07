const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LoaderOptionsPlugin = require("lodash-template-webpack-loader");
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'app.bundle.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'lodash'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
            },
            {
                test: /(\.tpl|\.html)$/,
                loader: 'lodash-template-webpack-loader',
                query: {
                    globalLodash: true,
                    root: 'src'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")

    ],
    resolve: {
        modules: ["node_modules"]
    }
};