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
    // const result = await adb.getDevices()
    do {
        console.log('\n三秒后执行大厅操作\n')
        await sleep(3)
        adb.swipe(300, 1000, 900, 1000, 300)
        await sleep(3)
        await order()
        await pickSiteMoney()
        await pickHallMoney()
        // await clickPropaganda(20)

        console.log('\n三秒后执行厨房操作\n')
        await sleep(3)
        await adb.swipe(900, 1000, 300, 1000, 300)
        await sleep(3)
        await pickKitchenMoney()

        console.log('\n一轮执行完成，休息 5 秒\n')
        await sleep(5)
    }
    while (true)
})()

async function order() {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            
            const x = config.firstSite.x + (config.siteOffset.x * j)
            const y = config.firstSite.y + (config.siteOffset.y * i)
            console.log(`点击第 ${(i * 3) + (j + 1)} 桌订单`)
            adb.tap(x, y)
            await sleep(1)
        }
    }
}

async function pickSiteMoney() {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            
            const x = config.firstMoney.x + (config.siteOffset.x * j)
            const y = config.firstMoney.y + (config.siteOffset.y * i)
            console.log(`拾取第 ${(i * 3) + (j + 1)} 桌扔钱`)
            adb.tap(x, y)
            await sleep(1)
        }
    }
}

async function pickHallMoney() {
    for (let key in config.hallMoney) {
        const item = config.hallMoney[key]
        console.log(`正在拾取 ${item.info} 的收入`)
        adb.tap(item.x, item.y)
        await sleep(0.5)
    }
}

async function clickPropaganda(number) {
    console.log(`\n点击 ${number} 次宣传按钮\n`)
    for (let i = 0; i < number; i++) {
        adb.tap(config.propaganda.x, config.propaganda.y)
        await sleep(0.5)
    }
}

async function pickKitchenMoney() {
    for (let key in config.kitchenMoney) {
        const item = config.kitchenMoney[key]
        console.log(`正在拾取 ${item.info} 的收入`)
        adb.tap(item.x, item.y)
        await sleep(0.5)
    }
}