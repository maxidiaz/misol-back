const User = require('../models/User')

const save = {
    handler(req, res) {
        const data = req.payload;
        const user = new User(req.payload)
        user.save()
            .then(user => {
                res({
                    status: 'OK',
                    data: {
                      name: user.name,
                      username: user.username,
                      profile_img: user.profile_img
                    }
                })
            })
    }
}

const list = {
    handler(req, res) {
        User.find()
            .exec()
            .then(users => {
                res({
                    status: 'OK',
                    data: users.map(user =>{
                      return {
                        name: user.name,
                        username: user.username,
                        profile_img: user.profile_img
                      }
                    })
                })
            })
    }
}

const update = {
  handler (req, res) {
    console.log(req.payload)
    User.findById(req.params.id, (err, user) => {
      const data = req.payload
      user.name = data.name
      user.price = data.price
      user.save().then(user => {
          res({
              status: 'OK',
              data: user
          })
      })
    })
  }
}

const find = {
    handler(req, res) {
      User.find({
        "username": req.params.username
      }).then(user => {
        res({
          status: 'OK',
          data: {
            name: user.name,
            username: user.username,
            profile_img: user.profile_img
          }
        })
      })
    }
}

const remove = {
    handler(req, res) {
        res(User.findOneAndRemove({
            "username": req.params.username
        }))
    }
}

module.exports = {
    save,
    list,
    find,
    remove
}
