const path = require('path')
const fs = require('fs')

const publicDir = path.join(__dirname, '..', 'public')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const publicIndex = path.join(__dirname, '..', 'public/index.html')
if (!fs.existsSync(publicIndex)) {
  process.chdir(publicDir)

  const relativeGameBugPath = path.join('..', 'game-bug.html')
  fs.symlinkSync(relativeGameBugPath, 'index.html', 'file')
}
