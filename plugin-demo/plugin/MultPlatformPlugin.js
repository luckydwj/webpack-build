const MyResolverPlugin=require('./MyResolverPlugin')
class MultPlatformPlugin{
    constructor() {
    }
    apply(compiler){
        compiler.resolverFactory.hooks.resolver
            .for('normal')
            .tap('MyResolverPlugin', (resolver) => {
                // you can tap into resolver.hooks now
                resolver.hooks.result.tap(MyResolverPlugin, (result) => {
                    return result;
                });
         });
    }
}
module.exports=MultPlatformPlugin