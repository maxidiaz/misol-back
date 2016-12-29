const Variety = require('../models/Variety')

const save = {
    handler(req, res) {
        const data = req.payload;
        if (data.name) {
            const variety = new Variety(req.payload)
            variety.save()
                .then(variety => {
                    res({
                        status: 'OK',
                        data: variety
                    })
                })
        } else {
            res({
                status: 'FAIL',
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
        res(Variety.findOneAndRemove({
            "_id": req.params.id
        }))
    }
}

module.exports = {
    save,
    list,
    find,
    remove
}
