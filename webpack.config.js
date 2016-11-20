// Webpack configuration
// http://webpack.github.io/docs/configuration.html
var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'build');

var config = {
    context: SRC_DIR,
    entry: SRC_DIR + '/webpack.entry.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'webpack.output.js'
    },
    module: {
        loaders : [
            {test : /\.jsx?/, include : SRC_DIR,loader : 'babel'}
        ]
    }
};

module.exports = config;
