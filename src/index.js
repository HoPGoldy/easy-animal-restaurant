const AdbControl = require('./adbControl')
const sleep = require('./utils').sleep

let adb = new AdbControl()

;(async function() {
    const result = await adb.getDevices()
    console.log(result)
    
    await sleep(5)

    console.log('执行！')
    adb.tap(390, 807)
})()
