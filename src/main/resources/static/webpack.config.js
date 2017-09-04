const path = require('path');

module.exports = {
    entry: '../static/js/index.js',
    output: {
        path:__dirname+ '/dist/',
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}