const Category = require('../models/Category')
const RecentTransactions = require('../models/RecentTransactions')
const moment = require('moment')
const THIS = 'CategoryController'

const save = {
    handler(req, res) {
        const data = req.payload;
        const category = new Category(req.payload)
        category.updatedBy = null
        console.log(THIS + ' :: save : ' + category)
        category.save()
            .then(category => {
               new RecentTransactions({
                 user : category.createdBy,
                 message : category.createdBy.displayName + ' creó una nueva categoría: ' + category.name,
                 action : 'ADD-CATEGORY',
                 actionId : category._id,
                 date : moment.utc().format()
               }).save()
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
      category.updatedBy = data.updatedBy
      category.save().then(category => {
        console.log(THIS + ' :: updated : ' + category)
        new RecentTransactions({
          user : category.updatedBy,
          message: category.updatedBy.displayName + ' actualizó la categoría ' + category.name,
          action: 'UPDATE-CATEGORY',
          actionId : category._id,
          date : moment.utc().format()
        }).save()
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
        Category.findOneAndRemove({
            "_id": req.params.id
        }, (err, category) => {
          new RecentTransactions({
            message: 'La categoría ' + category.name + ' fue eliminada',
            action: 'REMOVE-CATEGORY',
            date : moment.utc().format()
          }).save()
          res(category)
        })
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
