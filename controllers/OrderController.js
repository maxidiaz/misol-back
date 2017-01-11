const Order = require('../models/Order')
const RecentTransactions = require('../models/RecentTransactions')
const moment = require('moment')

const save = {
    handler(req, res) {
        const data = req.payload;
        const order = new Order(req.payload)
        order.deliveredBy = null
        order.save()
            .then(order => {
              new RecentTransactions({
                user : order.createdBy,
                message: order.createdBy.displayName + ' creó un nuevo pedido a nombre de ' + order.name,
                action: 'ADD-ORDER',
                actionId : order._id,
                date : moment.utc().format()
              }).save()
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
      let recent
      Order.findById(data._id, (err, order) => {
        order.status = data.status
        if (order.status === 'done') {
          order.deliveredOn = moment.utc().format()
          order.deliveredBy = data.deliveredBy
          order.varieties.map(variety => {
            require('../models/Variety').findById(variety._id)
              .then(v => {
                v.totalSold += variety.count
                v.save()
              })
          })
          recent = new RecentTransactions({
            user : order.deliveredBy,
            message: order.deliveredBy.displayName + ' finalizó el pedido a nombre de ' + order.name,
            action: 'UPDATE-ORDER',
            actionId : order._id,
            date : moment.utc().format()
          })
        } else {
          let status
          switch (order.status) {
            case 'inProgress':
              status = 'En proceso'
              break;
            case 'pending':
              status = 'Pendiente'
              break;
            case 'finished':
              status = 'Terminado'
              break;
          }
          recent = new RecentTransactions({
            user : data.user,
            message: data.user.displayName + ' marcó el pedido a nombre de ' + order.name + ' como ' + status,
            action: 'UPDATE-ORDER',
            actionId : order._id,
            date : moment.utc().format()
          })
        }
        order.save()
            .then(order => {
              recent.save()
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
      Order.findOneAndRemove({
          "_id": req.params.id
      }, (err, order) => {
        new RecentTransactions({
          message: 'El pedido a nombre de ' + order.name + ' ha sido eliminado.',
          action: 'REMOVE-ORDER',
          date : moment.utc().format()
        }).save()
        res(order)
      })
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
