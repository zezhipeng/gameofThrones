const path = require('path')
const LRU = require('lru-cache')
const Koa = require('koa')
const compression = require('koa-compress')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Router = require('koa-trie-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const Promise = require('bluebird')
const config = require('./app/config/config')

const r = file => path.resolve(__dirname, file)

const app = new Koa()
const router = new Router()

require(r('./app/middleware/mongoose'))(config)

app.keys = ['iceAndFile']

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true
}

app.use(session(CONFIG, app))
app.use(bodyParser())
app.use(compression({ threshold: 0 }))

require(r('./app/router/router'))(router)

app.use(router.middleware())



const port = process.env.PORT || 4323

// const Schema = mongoose.Schema

// var PersonSchema = new Schema({
//   name: String,
//   band: String
// });

// var BandSchema = new Schema({
//   name: String
// });
// BandSchema.virtual('members', {
//   ref: 'Person', // The model to use
//   localField: 'name', // Find people where `localField`
//   foreignField: 'band', // is equal to `foreignField`
//   // If `justOne` is false, 'members' will be a single doc as opposed to
//   // an array. `justOne` is false by default.
//   justOne: true
// });

// var Person = mongoose.model('Person', PersonSchema);
// var Band = mongoose.model('Band', BandSchema);

// var band1 = new Band({name: "Guns N' Roses"})
// var band2 = new Band({name: "Motley Crue"})

// var perseo1 = new Person({
//   name: 'Axl Rose',
//   band: "Guns N' Roses"
// })
// var perseo2 = new Person({
//   name: 'Slash',
//   band: "Vince Neil"
// })
// var perseo3 = new Person({
//   name: 'Nikki Sixx',
//   band: "Motley Crue"
// })
// // band1.save()
// // band2.save()
// // perseo1.save()
// // perseo2.save()
// // perseo3.save()

// /**
//  * Suppose you have 2 bands: "Guns N' Roses" and "Motley Crue"
//  * And 4 people: "Axl Rose" and "Slash" with "Guns N' Roses", and
//  * "Vince Neil" and "Nikki Sixx" with "Motley Crue"
//  */
// Band.find({}).populate('members').exec(function(error, bands) {
//   console.log(bands)
//   bands.forEach(i => {
//     console.log(i.members)
//   })
//   /* `bands.members` is now an array of instances of `Person` */
// });



app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
