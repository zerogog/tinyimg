const assert = require("assert");
const utils = require("../src/utils.js");
const path = require("path");
const fs = require("fs");

const { tinyImgs } = require("../src/tiny");

let testFunArr = [];

function testGetFilesByDir() {
  let files = utils.getFilesByDir("../");
  assert.ok(files.length > 0);
  assert.ok(files[0].name);
}
testFunArr.push(testGetFilesByDir);

function testConfig() {
  const config = utils.getConfig();
  assert.ok(config);
  assert.ok(config.local);
  assert.ok(config.local.path);
  console.log("local: ", config.local);
}
testFunArr.push(testConfig);

function testTiny() {
  let config = utils.getConfig();

  config.local.path = path.resolve(__dirname, "../asserts");
  config.local.zip = path.resolve(__dirname, "../zip");

  tinyImgs(config.local.path, config.local.zip);

  assert.ok(fs.existsSync(config.local.zip + "/DAA20210929970036.jpeg"));
}

testFunArr.push(testTiny);

function test() {
  testFunArr.forEach((func) => func());
}

test();
