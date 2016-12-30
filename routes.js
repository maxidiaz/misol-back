const VarietyController = require('./controllers/VarietyController')
const OrderController = require('./controllers/OrderController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')

const routes = [

  {method:'GET',path:'/',handler(req,res){
        res.file('./app/index.html')
      }
  },

  {
        method: 'GET',
        path: '/{filename*}',
        config: {
            auth: false,
            cache: {
                expiresIn: 24 * 60 * 60 * 1000,
                privacy: 'public'
            }
        },
        handler: {
            directory: {
                path: __dirname + '/app',
                listing: false,
                index: false
            }
        }
    }

  // Varieties
  {method:'POST',path:'/variety',config:VarietyController.save},
  {method:'GET',path:'/variety',config:VarietyController.list},
  {method:'GET',path:'/variety/{id}',config:VarietyController.find},
  {method:'DELETE',path:'/variety/{id}',config:VarietyController.remove},

  // Categories
  {method:'POST',path:'/category',config:CategoryController.save},
  {method:'GET',path:'/category',config:CategoryController.list},
  {method:'GET',path:'/category/{id}',config:CategoryController.find},
  {method:'GET',path:'/category/name/{name}',config:CategoryController.findByName},
  {method:'PUT',path:'/category/{id}',config:CategoryController.update},
  {method:'DELETE',path:'/category/{id}',config:CategoryController.remove},

  // Orders
  {method:'POST',path:'/order',config:OrderController.save},
  {method:'GET',path:'/order',config:OrderController.list},
  {method:'GET',path:'/order/{id}',config:OrderController.find},
  {method:'PUT',path:'/order',config:OrderController.update},
  {method:'GET',path:'/order/date/{datetime}',config:OrderController.findByDate},

  // Users
  {method:'POST',path:'/user',config:UserController.save},
  {method:'GET',path:'/user',config:UserController.list},
  {method:'GET',path:'/user/{username}',config:UserController.find},
  {method:'DELETE',path:'/user/{username}',config:UserController.remove}

]

module.exports = routes
