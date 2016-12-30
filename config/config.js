const fs = require('fs')

const mongodbConnectionIP = process.env.MONGODB_SERVICE_HOST || 'localhost'
const mongodbConnectionPORT = process.env.MONGODB_SERVICE_PORT || 27017
const mongodbUser = 'm.diaz'
const mongodbPassword = '100213..'

const hostIP = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
const hostPORT = process.env.MISOL_SERVICE_PORT || 3000

const config = {
  dbConnectionUrl : `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbConnectionIP}:${mongodbConnectionPORT}/misol`,
  serverConnection:{
    host:hostIP,
    port:hostPORT
  }
}

module.exports = config
