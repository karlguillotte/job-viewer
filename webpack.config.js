var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.png$/,
            loader: 'url?limit=100000'
        }, {
            test: /\.jpg$/,
            loader: 'file'
        }]
    },
    devServer: {
        devtool: 'eval',
        progress: true,
        colors: true,
        hot: true,
        contentBase: 'build',
        proxy: {
            '/api*': {
                target: 'http://localhost/cds',
            },
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
