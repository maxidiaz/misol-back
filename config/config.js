const fs = require('fs')

const tls = {
  key: fs.readFileSync(__dirname + '../keys/server.key'),
 cert: fs.readFileSync(__dirname + '../keys/server.crt')
}

const mongodbConnectionIP = process.env.MONGODB_SERVICE_HOST || 'localhost'
const mongodbConnectionPORT = process.env.MONGODB_SERVICE_PORT || 27017
const mongodbUser = 'm.diaz'
const mongodbPassword = '100213..'

const mongoURI = process.env.MONGODB_URI

const hostIP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '10.1.93.19'
const hostPORT = process.env.PORT || 8080

const config = {
  dbConnectionUrl : mongoURI,
  serverConnection:{
    port:hostPORT
  },
  tls:tls
}

module.exports = config
