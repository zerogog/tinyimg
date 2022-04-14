const fs =  require("fs");
const path = require("path");
const squoosh = require("@squoosh/lib");
const { log, getFilesByDir } = require("./utils.js");

const ImagePool = squoosh.ImagePool;
const retryList = [];

// zip img
const _tinyImg = async (
  imagePool,
  { localPath, zipPath },
  filepath,
  ext = ""
) => {
  const pathOpt = path.parse(filepath);
  pathOpt.dir = zipPath;

  try {
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
    // log({ code: "ERROE", message: `err file ${ pathOpt.dir + pathOpt.name}` });
    // if (e.code === "ERR_INVALID_ARG_TYPE" && /jp[e]g/g.test(pathOpt.ext)) {
    //   retryList.push({ filepath, tryExt: ".png" });
    // }
    //
    console.log("asdfasdfasf")
  }
};

// test
// _tinyImg(config, "./asserts/test.jpg")

const tinyImgs = async (localPath, zipPath) => {
  localPath = path.resolve(__dirname, localPath);
  zipPath = path.resolve(__dirname, zipPath);

  // console.log(localPath, zipPath)

  const imagePool = new ImagePool();
  const files = getFilesByDir(localPath);

  for (const file of files) {
    log({ code: "INFO", message: `zip ${file.name}` });
    await _tinyImg(imagePool, { localPath, zipPath }, file.path);
  }

  for (const item of retryList) {
    log({ code: "INFO", message: `retry ${item.filepath}` });
    await _tinyImg(
      imagePool,
      { localPath, zipPath },
      item.filepath,
      item.tryExt
    );
  }

  await imagePool.close();
};

module.exports = {
  tinyImgs,
  retryList,
};
