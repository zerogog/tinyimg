import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
export default {
  input: './src/index.js',
  output: {
    file: './build/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    json() // convert json
  ]
}
