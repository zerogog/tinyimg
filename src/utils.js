const  fs  = require("fs");
const yaml = require("yaml");
const path = require("path");

const getConfig = (configpath = "../config.yaml") => {
  const file = fs.readFileSync(path.resolve(__dirname, configpath), "utf8");
  const config = yaml.parse(file);
  return config;
};

const log = ({ code, message }) => {
  if (code === "INFO") {
    console.log(message);
  } else if (code === "ERROE") {
    console.error(message);
  }
};

const getFilesByDir = (dir) => {
  if (!dir) return [];
  let files = [];
  let prefix = path.resolve(__dirname, dir);
  let list = fs.readdirSync(prefix, { withFileTypes: true });

  for (const fd of list) {
    if (fd.isDirectory()) {
      let tempList = getFilesByDir(path.resolve(prefix, fd.name));
      if (tempList.length) {
        files.push(...tempList);
      }
    } else if (fd.isFile()) {
      files.push({ name: fd.name, path: path.resolve(prefix, fd.name) });
    }
  }
  return files;
};

module.exports = {
  log,
  getConfig,
  getFilesByDir,
};

