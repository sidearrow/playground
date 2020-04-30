require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})

exports.createPages = require('./src/gatsby-node/index').createPages
