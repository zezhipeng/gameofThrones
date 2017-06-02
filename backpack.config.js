module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './service/server/index.js'
    return config
  }
}