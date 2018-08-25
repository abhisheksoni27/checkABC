const webpack = require('webpack');

module.exports = [{
    entry: './css/app.scss',
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        filename: 'style-bundle.js',
    },
    devServer: {
        hot: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'css/bundle.css',
                    },
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['./node_modules']
                    }
                },
            ]
        }]
    },
}];