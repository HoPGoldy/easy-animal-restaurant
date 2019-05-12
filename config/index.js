const fs = require('fs')
const path = require('path')

const getConfig = function () {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../src/config.json')))
        
    }
    catch (e) {
        return false
    }
}

module.exports = getConfig