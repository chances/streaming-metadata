const path = require('path')
const fs = require('fs')

const publicDir = path.join(__dirname, '../public')

if (!fs.existsSync(path.join(publicDir))) {
  fs.mkdir(publicDir, { recursive: true })
}

const publicIndex = path.join(publicDir, 'index.html')
if (!fs.existsSync(publicIndex)) {
  fs.symlinkSync(publicIndex, path.join(__dirname, '../game-bug.html'), 'file')
}
