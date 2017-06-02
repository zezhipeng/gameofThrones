import { combineReducers } from 'redux'
import { FETCH_CHARACTERS, FETCH_HOUSES, FETCH_POVCHARACTERS, FETCH_BOOKS, FETCH_NINE_HOUSE } from './actions'


function characters (state = [], action) {
  switch (action.type) {
    case FETCH_CHARACTERS:
      return action.data
    default:
      return state
  }
}

function houses (state = [], action) {
  switch (action.type) {
    case FETCH_HOUSES:
      return action.data
    default:
      return state
  }
}

function nineHouses (state = [], action) {
  switch (action.type) {
    case FETCH_NINE_HOUSE:
      return action.data
    default:
      return state
  }
}

const todo = combineReducers({
  houses,
  nineHouses,
  characters
})

export default todo