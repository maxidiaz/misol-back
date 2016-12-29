const fs = require('fs')

const tls = {
  key: fs.readFileSync('C:/Users/m.diaz/Proyectos/MiSol/keys/server.key'),
  cert: fs.readFileSync('C:/Users/m.diaz/Proyectos/MiSol/keys/server.crt')
}

const config = {
  dbConnectionUrl : 'mongodb://127.0.0.1:27017/misol',
  serverConnection:{
    host:'0.0.0.0',
    port:3000
  }
}

module.exports = config
