const fs = require('fs')
const path = require('path')
const Oss = require('ali-oss')
const { getConfig, log } = require('./utils.js')
const config = getConfig()

const _uploadToOss = async (config, filepath) => {
  const pathOpt = path.parse(filepath)

  const client = new Oss({
    accessKeyId: config.oss.key_id,
    accessKeySecret: config.oss.key_secrect,
    bucket: config.oss.bucket,
    endpoint: config.oss.endpoint
  })

  try {
    await client.put(`${config.oss.path}/${pathOpt.name}${pathOpt.ext}`, filepath)
  } catch (e) {
    log({ code: 'ERROE', message: e.message })
  }
}

const upload = async () => {
  const files = fs.readdirSync(path.resolve(__dirname, config.local.zippath))

  for (const file of files) {
    log({ code: 'INFO', message: `upload ${file}` })
    await _uploadToOss(config, path.resolve(__dirname, config.local.zippath, file))
  }
}
// _uploadToOss(config, './asserts/test.png')
exports.upload = upload
