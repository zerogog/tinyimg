const { tinyImgs } = require('./tiny.js')
const { upload } = require('./oss.js')

const main = async () => {
  await tinyImgs()
  await upload()
}

module.exports = main
