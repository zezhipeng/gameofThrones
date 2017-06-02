export default class WebSocket {
  constructer (url, other, options) {
    wx.connectSocket({
      url: url,
      header: this.options.headers
    })

    this.onopen = wx.onSocketOpen
    this.onmessage = wx.onSocketMessage
    this.onclose = wx.onSocketClose
    this.onerror = wx.onSocketError
    this.send = wx.sendSocketMessage
    this.close = wx.closeSocket
  }
  // onopen () {
  //   return wx.onSocketOpen
  // }
  // onmessage () {
  //   return wx.onSocketMessage
  // }
  // onclose () {
  //   return wx.onSocketClose
  // }
  // onerror () {
  //   return wx.onSocketError
  // }
  // send () {
  //   return wx.sendSocketMessage
  // }
  // close () {
  //   return wx.closeSocket
  // }
}

