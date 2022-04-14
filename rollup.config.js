import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

export default {
  input: './src/cli.js',
  output: {
    file: './build/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve({ preferBuiltins: true }), // tells Rollup how to find date-fns in node_modules
    commonjs({ ignoreDynamicRequires: true }), // converts date-fns to ES modules
    json(), // convert json
    copy({ targets: [{ src: 'node_modules/@squoosh/lib/build/*.wasm', dest: 'build' }] })
  ]
}
