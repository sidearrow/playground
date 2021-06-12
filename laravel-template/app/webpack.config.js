const fs = require("fs")
const path = require("path")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")

const ENTRIES_DIR = path.join(__dirname, "resources/assets/js/entries")
const OUTPUT_DIR = path.join(__dirname, "public/assets")

const entries = fs.readdirSync(ENTRIES_DIR).reduce((prev, fname) => {
  const entryKey = fname.split(".")[0]
  prev[entryKey] = path.join(ENTRIES_DIR, fname)
  return prev
}, {})

module.exports = {
  entry: entries,
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ],
  },
  resolve: {
    extensions: [
      '.ts',
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({ filename: 'style.css' })
  ]
};