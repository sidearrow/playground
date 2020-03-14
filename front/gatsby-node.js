require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})

exports.createPages = require('./src/gatsbyNode/index').createPages
