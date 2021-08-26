const path = require('path')
const { tinyImgs } = require('./tiny.js')
const { upload } = require('./oss.js')
const { getConfig } = require('./utils.js')

const main = async () => {
  let config = getConfig()

  config.local.path = path.resolve(__dirname, "../asserts")
  config.local.zip = path.resolve(__dirname, "../zip")
  await tinyImgs(config)
  // await upload()
}

main();
