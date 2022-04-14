import  { tinyImgs } from "./tiny.js"
// const { upload } = require("./oss.js");
import utils from "./utils.js"
import { runCli } from "command-line-interface"




// todo change comman to
//  import { program } from 'commander/esm.mjs';

/*
 * suppoert command
 *
 * -s source dir or imgaes,
 * -t target dir, default to "./zip"
 * -u upload or not, default to false
 * -c config file path, default config.yaml
 * */

const tiny = {
  name: "tiny",
  description: "Tiny jpg|png files && upload to ali oss",
  remarks: `
    If you don't specify source dir or images, images in root dir will be used as default.
  `,

  optionDefinitions: [
    {
      name: "source",
      description: "source dir for storing images, default to './asserts'",
      type: "string",
      alias: "s",
    },
    {
      name: "target",
      description: "target dir for storing zipped images, default to './zip'",
      type: "string",
      alias: "t",
    },
    {
      name: "config",
      description: "config file path, for example: config.yaml",
      type: "string",
      alias: "c",
    },
  ],

  async handle({ options }) {
    try {
      if (options.config) {
        let config = utils.getConfig(options.config);
        if (!config) return;

        await tinyImgs(config.local.path, config.local.zip);
        return;
      }

      // console.log(options.source)
      await tinyImgs(options.source, options.target);
    } catch (e) {
      console.error(e.message);
    }
  },
};

runCli({ rootCommand: tiny, argv: process.argv });
