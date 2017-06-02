export const FETCH_CHARACTERS = 'FETCH_CHARACTERS'
export const FETCH_HOUSES = 'FETCH_HOUSES'
export const FETCH_POVCHARACTERS = 'FETCH_POVCHARACTERS'
export const FETCH_BOOKS = 'FETCH_BOOKS'
export const FETCH_NINE_HOUSE = 'FETCH_NINE_HOUSE'

const baseUrl = 'https://iceandfire-d76e1.firebaseio.com'
const serverUrl = 'http://localhost:4323'

const fetch = {
  async get (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          resolve(res.data)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  },
  async post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        data: data,
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          resolve(res.data)
        },
        fail (e) {
          reject(e)
        }
      })
    })
  }
}

const actions = {
  async characters(id) {
    const data = await fetch.get(`${baseUrl}/characters.json?orderBy="hid"&startAt=0&endAt=20`)

    return { type: FETCH_CHARACTERS, data }
  },
  async houses(id) {
    const data = await fetch.get(`${baseUrl}/houses.json?orderBy="hid"&startAt=0&endAt=8`)

    return { type: FETCH_HOUSES, data }
  },
  async povCharacters(id) {
    const data = await fetch.get(`${baseUrl}/povCharacters.json`)

    return { type: FETCH_POVCHARACTERS, data }
  },
  async nineHouses () {
    const data = await fetch.get(`${baseUrl}/nineHouses.json`)

    return { type: FETCH_NINE_HOUSE, data }
  },
  async books(id) {
    const data = await fetch.get(`${baseUrl}/books.json`)

    return { type: FETCH_BOOKS, data }
  }
}
// export async function characters(id) {
//   const data = await fetch.get(`${baseUrl}/tvCharacters.json`)

//   return { type: FETCH_CHARACTERS, data }
// }

// export async function houses(id) {
//   const data = await fetch.get(`${baseUrl}/tvHouses.json`)

//   return { type: FETCH_HOUSES, data }
// }

// export async function povCharacters(id) {
//   const data = await fetch.get(`${baseUrl}/povCharacters.json`)

//   return { type: FETCH_POVCHARACTERS, data }
// }

// export async function books(id) {
//   const data = await fetch.get(`${baseUrl}/books.json`)

//   return { type: FETCH_BOOKS, data }
// }

export default actions