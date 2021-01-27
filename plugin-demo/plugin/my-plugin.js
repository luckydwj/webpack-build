class EndWebpackPlugin {
    constructor(doneCallback,failCallback) {
        this.doneCallback=doneCallback
        this.failCallback=failCallback
    }
    apply(compiler){
        compiler.hooks.done.callAsync('EndWebpackPlugin',(stats, err) => {
           this.doneCallback(stats)
        })
        compiler.hooks.failed.callAsync('EndWebpackPlugin',(stats, err) => {
            this.failCallback(err)
        })
    }
}
module.exports=EndWebpackPlugin