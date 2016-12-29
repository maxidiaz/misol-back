const fs = require('fs')

const mongodbConnectionIP = process.env.OPENSHIFT_MONGODB_DB_IP || 'localhost'
const mongodbConnectionPORT = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017
const mongodbUser = 'm.diaz'
const mongodbPassword = '100213..'

const hostIP = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
const hostPORT = process.env.OPENSHIFT_NODEJS_PORT || 3000

const config = {
  dbConnectionUrl : `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbConnectionIP}:${mongodbConnectionPORT}/misol`,
  serverConnection:{
    host:hostIP,
    port:hostPORT
  }
}

module.exports = config
