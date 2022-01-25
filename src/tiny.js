const fs = require("fs");
const path = require("path");
const squoosh = require("@squoosh/lib");
const ImagePool = squoosh.ImagePool;
const { log, getFilesByDir } = require("./utils.js");

const retryList = [];

// zip img
const _tinyImg = async (imagePool, config, filepath, ext = "") => {
  let desDir = filepath.replace(config.local.path, "./");
  const pathOpt = path.parse(path.resolve(config.local.zip, desDir));
  try {
    // tiny imgs
    // const imagePool = new ImagePool()
    const img = imagePool.ingestImage(filepath);

    await img.decoded;
    const preprocessOpts = {
      quant: {
        enable: true,
      },
    };

    const encodeOpts = {
      mozjpeg: {},
      oxipng: {},
    };

    await img.preprocess(preprocessOpts);
    await img.encode(encodeOpts);
    let zipImg = {};

    const converExt = ext || pathOpt.ext;
    if (/png/g.test(converExt)) {
      zipImg = await img.encodedWith.oxipng;
    } else if (converExt) {
      zipImg = await img.encodedWith.mozjpeg;
    }
     
    if (!fs.existsSync(pathOpt.dir)) {
      fs.mkdirSync(pathOpt.dir, { recursive: true });
    }

    fs.writeFileSync(path.resolve(pathOpt.dir, pathOpt.base), zipImg.binary);
  } catch (e) {
    // 记录部分png图片被强制命名为jpg
    log({ code: "ERROE", message: `err file ${pathOpt.name}` });
    if (e.code === "ERR_INVALID_ARG_TYPE" && /jp[e]g/g.test(pathOpt.ext)) {
      retryList.push({ filepath, tryExt: ".png" });
    }
  }
};

// test
// _tinyImg(config, "./asserts/test.jpg")

const tinyImgs = async (config) => {
  const imagePool = new ImagePool();
  const files = getFilesByDir(config.local.path);

  for (const file of files) {
    log({ code: "INFO", message: `zip ${file.name}` });
    await _tinyImg(imagePool, config, file.path);
  }

  for (const item of retryList) {
    log({ code: "INFO", message: `retry ${item.filepath}` });
    await _tinyImg(imagePool, config, item.filepath, item.tryExt);
  }

  await imagePool.close();
};

exports.tinyImgs = tinyImgs;
exports.retryList = retryList;
