const Category = require('../models/Category')
const THIS = 'CategoryController'

const save = {
    handler(req, res) {
        const data = req.payload;
        const category = new Category(req.payload)
        console.log(THIS + ' :: save : ' + category)
        category.save()
            .then(category => {
                res({
                    status: 'OK',
                    data: category
                })
            })
    }
}

const list = {
    handler(req, res) {
        Category.find()
            .exec()
            .then(categories => {
                res({
                    status: 'OK',
                    data: categories
                })
            })
    }
}

const update = {
  handler (req, res) {
    console.log(req.payload)
    Category.findById(req.params.id, (err, category) => {
      console.log(THIS + ' :: about to update : ' + category)
      const data = req.payload
      category.name = data.name
      category.price = data.price
      category.save().then(category => {
        console.log(THIS + ' :: updated : ' + category)
          res({
              status: 'OK',
              data: category
          })
      })
    })
  }
}

const find = {
    handler(req, res) {
        res(Category.find({
            "_id": req.params.id
        }))
    }
}

const findByName = {
    handler (req, res) {
        res(Category.find({
            "name": req.params.name
        }))
    }
}

const remove = {
    handler(req, res) {
        console.log(THIS + ' :: remove : ' + req.params.id)
        res(Category.findOneAndRemove({
            "_id": req.params.id
        }))
    }
}

module.exports = {
    save,
    list,
    find,
    findByName,
    update,
    remove
}
