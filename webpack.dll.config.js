const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: [
            "react",
            "react-dom"
        ],
    },
    output: {
        path: __dirname + '/pub/',
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: __dirname + '/pub/bundle.manifest.json',
            name: '[name]_library',
            context: __dirname + '/pub/',
        })
    ]
};