require('ts-node').register(require('./tsconfig.json'));

exports.createPages = require('./src/gatsbyNode/gatsbyNode').createPages;
