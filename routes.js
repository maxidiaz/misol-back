const VarietyController = require('./controllers/VarietyController')
const OrderController = require('./controllers/OrderController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')

const apiPrefix = '/api'

const routes = [
  {method:'GET',path: apiPrefix + '/',handler(req,res){
        res.file('./app/index.html')
      }
  },

  // Varieties
  {method:'POST',path: apiPrefix + '/variety',config:VarietyController.save},
  {method:'GET',path: apiPrefix + '/variety',config:VarietyController.list},
  {method:'GET',path: apiPrefix + '/variety/{id}',config:VarietyController.find},
  {method:'DELETE',path: apiPrefix + '/variety/{id}',config:VarietyController.remove},

  // Categories
  {method:'POST',path: apiPrefix + '/category',config:CategoryController.save},
  {method:'GET',path: apiPrefix + '/category',config:CategoryController.list},
  {method:'GET',path: apiPrefix + '/category/{id}',config:CategoryController.find},
  {method:'GET',path: apiPrefix + '/category/name/{name}',config:CategoryController.findByName},
  {method:'PUT',path: apiPrefix + '/category/{id}',config:CategoryController.update},
  {method:'DELETE',path: apiPrefix + '/category/{id}',config:CategoryController.remove},

  // Orders
  {method:'POST',path: apiPrefix + '/order',config:OrderController.save},
  {method:'GET',path: apiPrefix + '/order',config:OrderController.list},
  {method:'GET',path: apiPrefix + '/order/{id}',config:OrderController.find},
  {method:'PUT',path: apiPrefix + '/order',config:OrderController.update},
  {method:'GET',path: apiPrefix + '/order/date/{datetime}',config:OrderController.findByDate},

  // Users
  {method:'POST',path: apiPrefix + '/user',config:UserController.save},
  {method:'GET',path: apiPrefix + '/user',config:UserController.list},
  {method:'GET',path: apiPrefix + '/user/{username}',config:UserController.find},
  {method:'DELETE',path: apiPrefix + '/user/{username}',config:UserController.remove}

]

module.exports = routes
