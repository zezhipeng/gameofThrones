import regeneratorRuntime from 'regenerator-runtime'
global.regeneratorRuntime = regeneratorRuntime

import util from '../utils/util'
global.util = util

import actions from '../store/actions'
global.actions = actions

import * as _ from 'lodash'
global._ = _

import store from '../store/store'
global.store = store

global.fetch = {
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