const fs = require('fs')

const tls = {
  key: fs.readFileSync(__dirname + '/../keys/server.key'),
  cert: fs.readFileSync(__dirname + '/../keys/server.crt')
}

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/misol'

const hostPORT = process.env.PORT || 3000

const config = {
  dbConnectionUrl : mongoURI,
  serverConnection:{
    port:hostPORT
  },
  tls:tls
}

module.exports = config
