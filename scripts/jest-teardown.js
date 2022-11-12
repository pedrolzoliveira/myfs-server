const fs = require('fs')
const path = require('path')

function main () {
  console.log('\ndeleting temp files...\n')
  const folderPath = path.resolve(__dirname, '..', 'tmp', 'test', 'fs')
  fs.readdirSync(folderPath).forEach(file => {
    fs.unlinkSync(
      path.join(folderPath, file)
    )
  })
}

module.exports = main
