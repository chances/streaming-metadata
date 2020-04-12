const path = require('path')
const fs = require('fs')

const publicDir = path.join(__dirname, '..', 'public')

if (!fs.existsSync(path.join(publicDir))) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const publicIndex = path.join(publicDir, 'index.html')
if (!fs.existsSync(publicIndex)) {
  fs.symlinkSync(path.join(__dirname, '..', 'game-bug.html'), publicIndex, 'file')
}
