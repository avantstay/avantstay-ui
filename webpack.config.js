const path = require('path')
const fs = require('fs')
const nodeExternals = require('webpack-node-externals')

let entries = {
  index: './src/index.ts',
  ...Object.fromEntries(
    fs
      .readdirSync('./src')
      .filter(it => /^[A-Z]/.test(it))
      .map(it => [it, `./src/${it}/index.ts`])
  ),
  ...Object.fromEntries(
    fs.readdirSync('./src/utils').map(it => [`utils/${it.replace(/.tsx?/, '')}`, `./src/utils/${it}`])
  ),
}

module.exports = {
  entry: entries,
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: ({ chunk: { name } }) => {
      return /^(index|utils)/.test(name) ? `[name].js` : '[name]/index.js'
    },
    path: path.resolve(__dirname, 'lib'),
  },
}
