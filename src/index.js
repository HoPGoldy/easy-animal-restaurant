const AdbControl = require('./adbControl')
const sleep = require('./utils').sleep
// 获取配置
const getConfig = require('../config')
const config = getConfig()
if (!config) {
    console.log('错误！配置文件未加载！')
    return false
}

let adb = new AdbControl()

;(async function() {
    const result = await adb.getDevices()
    console.log(result)
    
    console.log(config)
    // await sleep(5)

    console.log('执行！')
    adb.tap(390, 807)
})()

async function order() {

}