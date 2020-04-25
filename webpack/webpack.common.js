const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/,/sqlMiddleware/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'babel-preset-react']
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './templates/index.html'
        })
    ]
};
