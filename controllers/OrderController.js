const Order = require('../models/Order')
const moment = require('moment')

const save = {
    handler(req, res) {
        const data = req.payload;
        const order = new Order(req.payload)
        order.save()
            .then(order => {
                res({
                    status: 'OK',
                    data: order
                })
            })
    }
}

const list = {
    handler(req, res) {
      let criteria = {};
      if (req.query.noDone) {
        criteria = {
          'status' : {
            $ne: 'done'
          }
        }
      }
      console.log(criteria)
      Order.find(criteria)
        .exec()
        .then(orders => {
          console.log(orders)
          res({
              status: 'OK',
              data: orders
          })
      })
    }
}

const update = {
  handler(req, res) {
      const data = req.payload;
      Order.findById(data._id, (err, order) => {
        order.status = data.status
        if (order.status === 'done') {
          order.deliveredOn = moment.utc().format()
          order.varieties.map(variety => {
            require('../models/Variety').findById(variety._id)
              .then(v => {
                v.totalSold += variety.count
                v.save()
              })
          })
        }
        order.save()
            .then(order => {
                res({
                    status: 'OK',
                    data: order
                })
            })
      })
  }
}

const find = {
    handler(req, res) {
        res(Order.find({
            "_id": req.params.id
        }))
    }
}

const findByDate = {
  handler (req, res) {
    const dateTime = moment(req.params.datetime)
    const criteria = {
      deliveredOn: {
        $gte: dateTime.startOf('day').toDate(),
        $lte: dateTime.endOf('day').toDate()
      }
    }
    if (req.query.status) {
      criteria.status = req.query.status
    }
    res(Order.find(criteria))
  }
}

const remove = {
    handler(req, res) {
        res(Order.findOneAndRemove({
            "_id": req.params.id
        }))
    }
}


module.exports = {
    save,
    list,
    find,
    update,
    findByDate,
    remove
}
