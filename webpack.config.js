const path = require('path')

module.exports = {
    entry: {
        "index": path.resolve(__dirname, 'lib/index.tsx'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode :'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: ['ts-loader'],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve : {
        modules: [
            'node_modules',
        ],
        extensions: ['.js', '.tsx']
    },
};
