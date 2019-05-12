const { exec } = require('child_process')

// process.exec('adb devices', function (error, stdout, stderr) {
//     if (error !== null) {
//       console.log('exec error: ' + error);
//     }

//     console.log(stdout)
// })

module.exports = class AdbControl {
    constructor() {
        this.hander = 'adb'
    }

    async getDevices() {
        const result = await this.exec('devices')
        return result.stdout.split('\r\n')
            .filter(item => {
                return item && item != 'List of devices attached '
            })
            .map(item => {
                const deviceInfo = item.split('\t')
                return {
                    id: deviceInfo[0],
                    state: deviceInfo[1]
                }
            })
    }

    async tap(x, y) {
        this.exec(`shell input tap ${x} ${y}`)
    }

    exec(cmd) {
        return new Promise((resolve, reject) => {
            exec('adb ' + cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                }
                resolve({
                    stdout,
                    stderr
                })
            })
        })
    }
}