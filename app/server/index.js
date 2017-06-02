const Koa = require('koa')
const Nuxt = require('nuxt')
const mongoose = require('mongoose')
const Router = require('koa-trie-router')

mongoose.Promise = require('bluebird')

const app = new Koa()
const router = new Router()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Start nuxt.js
async function start () {
  require('../mongoose')

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')
  // Instanciate nuxt.js
  const nuxt = await new Nuxt(config)
  // Build in development
  if (config.dev) {
    try {
      await nuxt.build()
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
      process.exit(1)
    }
  }
  require('../routes')(router)

  router.use(async (ctx, next) => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    console.log(ctx.status)
    await nuxt.render(ctx.req, ctx.res)
  })

  app.use(router.middleware())

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()