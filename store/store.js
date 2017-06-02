import { applyMiddleware, createStore } from 'redux'
import todo from './reducers'
import { characters, houses } from './actions'
import asyncAwait from 'redux-async-await'

var store = applyMiddleware(asyncAwait)(createStore)(todo)

store.subscribe(() =>
  console.log(store.getState())
)

export default store