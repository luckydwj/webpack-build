const path=require('path')
module.exports={
    entry:{
        index:'./src/index.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:path.resolve(__dirname, './my-loader.js')
            }
        ]
    }
}