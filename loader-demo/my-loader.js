module.exports = function (source) {
    console.log("====source=====",source)
    return source.replace(/console\.log\(.+\)/, "console.log('hello world')");
};