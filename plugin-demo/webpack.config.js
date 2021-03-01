const MyResolverPlugin=require('./plugin/MyResolverPlugin')
const path = require('path');
module.exports = {
    context: path.resolve(__dirname),
    entry: './src/index.js',
    devtool: 'inline-source-map',
    mode:'development',
    optimization: {
        usedExports: true,
    },
    resolve: {
        extensions: ['.js' ],
        plugins:[new MyResolverPlugin('resolve','resolve')]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};