const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const IMDbSchema = new Schema({
  playedBy: String,
  nmId: String,
  name: String,
  chId: String,
  images: [
    String
  ],
  profile: String
})


const IMDb = mongoose.model('IMDb', IMDbSchema)

module.exports = IMDb