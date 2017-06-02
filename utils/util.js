import regeneratorRuntime from 'regenerator-runtime'
global.regeneratorRuntime = regeneratorRuntime

const baseUrl = 'https://iceandfire-d76e1.firebaseio.com'
const serverUrl = 'http://localhost:4323'

export default {
  async getPovCharacters () {
    var res = await global.fetch.get(`${baseUrl}/povCharacters.json`)

    return res
  },
  async getTvCharacters () {
    var res = await global.fetch.get(`${baseUrl}/tvCharacters.json`)

    return res
  },
  async getTvHouses () {
    var res = await global.fetch.get(`${baseUrl}/tvHouses.json`)

    return res
  },
  async getHouses () {
    var res = await global.fetch.get(`${baseUrl}/houses.json`)

    return res
  },
  async getCharacters () {
    var res = await global.fetch.get(`${baseUrl}/characters.json`)

    return res
  },
  async getNineHouses () {
    var res = await global.fetch.get(`${serverUrl}/nineHouses.json`)

    return res
  },
  async getBooks () {
    var res = await global.fetch.get(`${baseUrl}/books.json`)

    return res
  }
}