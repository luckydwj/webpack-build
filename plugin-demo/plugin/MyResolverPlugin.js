const fs=require('fs')
const path=require('path')
class MyResolverPlugin {
    constructor(source, target) {
        this.source = source;// 当前插件挂在哪个钩子下
        this.target = target;// 触发的下一个钩子
    }
   resolveMainFilePath (p, extArrs = ['.js', '.jsx','.ts', '.tsx']) {
        const realPath = p
        const taroEnv = process.env.TARO_ENV
        for (let i = 0; i < extArrs.length; i++) {
            const item = extArrs[i]
            if (taroEnv) {
                if (fs.existsSync(`${p}.${taroEnv}${item}`)) {
                    return `${p}.${taroEnv}${item}`
                }
                if (fs.existsSync(`${p}${path.sep}index.${taroEnv}${item}`)) {
                    return `${p}${path.sep}index.${taroEnv}${item}`
                }
                if (fs.existsSync(`${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`)) {
                    return `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`
                }
            }
            if (fs.existsSync(`${p}${item}`)) {
                return `${p}${item}`
            }
            if (fs.existsSync(`${p}${path.sep}index${item}`)) {
                return `${p}${path.sep}index${item}`
            }
        }
        return realPath
    }

    apply(resolver) {
        const target = resolver.ensureHook(this.target)
        resolver
            .getHook(this.source)
            .tapAsync('MyResolverPlugin', (request, resolveContext, callback) => {
                console.log("==========requestaaa=======",request)
                const innerRequest = request.request || request.path
                if (!innerRequest || !request.context.issuer) return callback()
                if (!path.extname(innerRequest)) {
                    let srcRequest
                    if (path.isAbsolute(innerRequest)) {
                        // absolute path
                        srcRequest = innerRequest
                    } else if (!path.isAbsolute(innerRequest) && /^\./.test(innerRequest)) {
                        // relative path
                        srcRequest = path.resolve(request.path, request.request)
                    } else {
                        return callback()
                    }

                    if (/node_modules/.test(srcRequest) && !this.includes(srcRequest)) {
                        return callback()
                    }

                    const newRequestStr = this.resolveMainFilePath(srcRequest)
                    if (newRequestStr === innerRequest) return callback()
                    const obj = Object.assign({}, request, {
                        request: newRequestStr
                    })
                    console.log("====obj========",obj)
                    return resolver.doResolve(target, obj, 'resolve multi platform file path', resolveContext, (err, result) => {
                        console.log("======erraaaaa=======",err)
                        if (err) return callback(err)

                        if (result === undefined) return callback(null, null)
                        return callback(null, result)
                    })
                }

                callback()
            })
    }
}

module.exports=MyResolverPlugin