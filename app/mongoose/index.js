'use strict'

const fs = require('fs')
const mongoose = require('mongoose')
const { join } = require('path')
// const autoinc = require('../lib/autoinc')
const models = join(__dirname, '../schema')
const _ = require('lodash')
const API = require('../firebase')

// fs.readdirSync(models)
//   .filter(file => ~file.search(/^[^\.].*\.js$/))
//   .forEach(file => require(join(models, file)))

module.exports = config => {
  if (config.env === 'development') {
    // mongoose.set('debug', true)
  }
  mongoose.connect(config.db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB', config.db)

    var characters = require('../db/allCharacters.json')
    var houses = require('../db/allHouses.json')
    var books = require('../db/allBooks.json')
    var imdb = require('../db/IMDb.json')

    const Character = require('../schema/character')
    const House = require('../schema/house')
    const Book = require('../schema/book')
    const IMDb = require('../schema/imdb')

    books = _.map(books, formatData)
    characters = _.map(characters, formatData)  
    houses = _.map(houses, formatData)

    let existBook = await Book.find({}).exec()
    if (!existBook.length) Book.insertMany(books)

    let existCharacter = await Character.find({}).exec()
    if (!existCharacter.length) Character.insertMany(characters)

    let existHouse = await House.find({}).exec()
    if (!existHouse.length) House.insertMany(houses)

    let exixtIMDb = await IMDb.find({}).exec()
    if (!exixtIMDb.length) IMDb.insertMany(imdb)

  })
}

var formatData = (item, index) => {
  item._id = item.url

  _.forIn(item, (value, key) => {
    if (!value || !value.length) delete item[key]
  })

  return item
}
