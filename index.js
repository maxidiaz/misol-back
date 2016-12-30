const hapi = require('hapi');
const server = new hapi.Server();
const mongoose = require('mongoose');
const config = require('./config/config')
const initDb = require('./initDb')();
const corsHeaders = require('hapi-cors-headers');

mongoose.connect(config.dbConnectionUrl)

server.connection(config.serverConnection)

//server.ext('onPreResponse', corsHeaders)

server.register(require('./plugins'), (error)=>{
  if(error){
    console.log("Error loading plugin: "+error)
  }
})

server.route(require('./routes'))

server.start((error)=>{
  if(error){
    console.log(error)
  }
  console.log('Server info: ')
  console.log(JSON.stringify(server.info, null, 4))
})
