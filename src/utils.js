const sleep = function(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}

module.exports = {
    sleep
}