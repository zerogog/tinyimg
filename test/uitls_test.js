const assert = require("assert");
const utils = require("../src/utils");

function test() {
  let files = utils.getFilesByDir("../");

  assert.ok(files.length > 0);
  assert.ok(files[0].name);
}

test();
