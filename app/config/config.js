const _ = require('lodash')
const { resolve } = require('path')

const env = process.env.NODE_ENV || 'development'
const conf = require(resolve(__dirname, `./${env}.json`))

module.exports = _.assign({
  env,
}, conf)
