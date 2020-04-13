import * as path from 'path'
import { existsSync, mkdirSync, symlinkSync } from 'fs'
import * as fs from 'fs'

const publicDir = new URL('../public', import.meta.url)

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true })
}

const publicIndex = new URL('../public/index.html', import.meta.url)
if (!existsSync(publicIndex)) {
  process.chdir(publicDir.pathname)

  const relativeGameBugPath = path.join('..', 'game-bug.html')
  symlinkSync(relativeGameBugPath, 'index.html', 'file')
}

const distDir = new URL('../dist', import.meta.url)
const jsDir = new URL('public/js', publicDir)
copyRecursiveSync(distDir.pathname, jsDir.pathname)

const webModulesDir = new URL('../web_modules', import.meta.url)
const publicWebModulesDir = new URL('public/web_modules', publicDir)
copyRecursiveSync(webModulesDir.pathname, publicWebModulesDir.pathname)

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    if (!existsSync(dest)) fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
      )
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}
