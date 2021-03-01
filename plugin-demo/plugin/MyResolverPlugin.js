const fs=require('fs')
const path=require('path')
class MyResolverPlugin {
    constructor(source, target) {
        this.source = source;// 当前插件挂在哪个钩子下
        this.target = target;// 触发的下一个钩子
    }
   resolveMainFilePath (p, extArrs = ['.js', '.jsx','.ts', '.tsx']) {
        const realPath = p
        const tagEnv = process.env.CI_BUILD_TAG
        for (let i = 0; i < extArrs.length; i++) {
            const item = extArrs[i]
            if (tagEnv) {
                if (fs.existsSync(`${p}.${tagEnv}${item}`)) {
                    return `${p}.${tagEnv}${item}`
                }
                if (fs.existsSync(`${p}${path.sep}index.${tagEnv}${item}`)) {
                    return `${p}${path.sep}index.${tagEnv}${item}`
                }
                if (fs.existsSync(`${p.replace(/\/index$/, `.${tagEnv}/index`)}${item}`)) {
                    return `${p.replace(/\/index$/, `.${tagEnv}/index`)}${item}`
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
                    return resolver.doResolve(target, obj, 'resolve multi platform file path', resolveContext, (err, result) => {
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