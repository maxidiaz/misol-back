const RecentTransactions = require('../models/RecentTransactions')

const list = {
  handler (req, res) {
    console.log(req.query)
    const page = Number(req.query.page) || 0
    const limit = Number(req.query.limit) || 10
    RecentTransactions.find()
        .limit(limit)
        .skip(page * limit)
        .sort({date: 'descending'})
        .exec()
        .then(recent => {
            res({
                status: 'OK',
                data: recent
            })
        })
  }
}

module.exports = {
  list
}
