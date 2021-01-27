const EndWebpackPlugin =require('./plugin/my-plugin')
module.exports = {
    entry:{
        index:'./src/index.js',
    },

    plugins:[
        new EndWebpackPlugin((stats) => {
            console.info('已成功构建',stats)
        }, (err) => {
            console.error('构建失败',err);
        })
    ]
};
