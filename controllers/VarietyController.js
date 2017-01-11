const Variety = require('../models/Variety')
const RecentTransactions = require('../models/RecentTransactions')
const moment = require('moment')

const save = {
    handler(req, res) {
        const data = req.payload;
        if (data.name) {
          Variety.findOne({name: data.name}, (err, varieties) => {
            if (err) {
              res({
                  status: 'FAIL',
                  errorCode: 1001,
                  errorMessage: err
              }).code(406)
            }
            if (varieties) {
              res({
                  status: 'FAIL',
                  errorCode: 1002,
                  errorMessage: 'Ya existe una variedad de nombre ' + data.name
              }).code(406)
            } else {
              const variety = new Variety(req.payload)
              variety.save()
                  .then(variety => {
                      new RecentTransactions({
                        user : variety.createdBy,
                        message: variety.createdBy.displayName + ' agregó la variedad ' + variety.name,
                        action: 'ADD-VARIETY',
                        actionId : variety._id,
                        date : moment.utc().format()
                      }).save()
                      res({
                          status: 'OK',
                          data: variety
                      })
                  })
            }
          })
        } else {
            res({
                status: 'FAIL',
                errorCode: 1000,
                errorMessage: 'Variety must have a name'
            })
        }
    }
}

const list = {
    handler(req, res) {
        let criteria = {};
        if (req.query.filterBy) {
          criteria = {
            'category' : req.query.filterBy
          }
        }
        Variety.find(criteria)
            .populate('category')
            .exec()
            .then(varieties => {
                res({
                    status: 'OK',
                    data: varieties
                })
            })
    }
}

const find = {
    handler(req, res) {
        res(Variety.find({
            "_id": req.params.id
        }))
    }
}

const remove = {
    handler(req, res) {
      Variety.findOneAndRemove({
          "_id": req.params.id
      }, (err, variety) => {
        new RecentTransactions({
          message: 'La variedad ' + variety.name + ' fue eliminada.',
          action: 'REMOVE-VARIETY',
          date : moment.utc().format()
        }).save()
        res({
          status: 'OK',
          data: variety
        })
      })
    }
}

module.exports = {
    save,
    list,
    find,
    remove
}
