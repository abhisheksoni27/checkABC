const autoprefixer = require('autoprefixer');
const MinifyPlugin = require("babel-minify-webpack-plugin");
module.exports = {
    entry: ['./css/app.scss', './js/index.js'],
    output: {
        filename: 'bundle.js',
    },
    plugins: [
        new MinifyPlugin()
    ],
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules'],
                        },
                    }
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                },
            }
        ],
    },
};