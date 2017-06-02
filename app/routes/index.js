const Character = require('../schema/character')
const House = require('../schema/house')
const Book = require('../schema/book')
const IMDb = require('../schema/imdb')
const _ = require('lodash')

const NINE_HOUSES = [
  "House Stark of Winterfell",
  "House Lannister of Casterly Rock",
  "House Targaryen of King's Landing",
  "House Nymeros Martell of Sunspear",
  "House Baratheon of Storm's End",
  "House Greyjoy of Pyke",
  "House Tyrell of Highgarden",
  "House Tully of Riverrun",
  "House Arryn of the Eyrie"
]

module.exports = router => {
  router.get('/characters', async (ctx, next) => {
    var res = await Character
      .find({
        name: { $exists: true },
        tvSeries: { $exists: true }
      })
      .populate({
        path: 'IMDb'
      })
      .limit(20)
      .exec()

    ctx.body = res
  })

  router.get('/povCharacters', async (ctx, next) => {
    var povCharactersList = await IMDb
      .find({})
      .limit(20)
      .select('name')
      .exec()

    povCharactersList = _.map(povCharactersList, povCharacter => povCharacter.name)

    var res = await Character
      .find({
        name: { $in: povCharactersList }
      })
      .populate({
        path: 'IMDb'
      })
      .limit(20)
      // .where({ father: { $exists: true }})
      .exec()

    res = _.sortBy(res, [
      item => povCharactersList.indexOf(item.name)
    ])

    ctx.body = res
  })

  router.get('/houses', async (ctx, next) => {
    var res = await Character
      .find({
        name: { $exists: true },
        swornMembers: { $exists: true }
      })
      .limit(20)
      .exec()

    ctx.body = res
  })

  router.get('/books', async (ctx, next) => {
    var res = await Book
      .find({})
      .exec()

    ctx.body = res
  })

  router.get('/nineHouses', async (ctx, next) => {
    var res = await House
      .find({name: { $in: NINE_HOUSES }})
      .populate({
        path: 'swornMembers',
        populate: {
          path: 'IMDb'
        },
        match: {
          IMDb: { $exists: true }
        },
        options: {
          limit: 12,
          sort: '-IMDb'
        }
      })
      .populate({
        path: 'currentLord',
        populate: {
          path: 'IMDb'
        }
      })
      .populate({
        path: 'founder',
        populate: {
          path: 'IMDb'
        }
      })

    ctx.body = res
  })

  return router
}