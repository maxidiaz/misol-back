const fs = require("fs")

const saveImage = {
    handler: (req, reply) => {
        var data = req.payload;
        console.log(data)
        var base64Data = data.photoURL.replace(/^data:image\/png;base64,/, "");

        const fileName = '/uploads/' + data.displayName + Date.now() + '.png'
        console.log(fileName)

        fs.writeFile(__dirname + '/../app' + fileName, base64Data, 'base64', function(err) {
          if (err) {
            console.log(err)
            return
          }
          reply({
            status: 'OK',
            data: {
              avatarUrl: fileName
            }
          })
        });
    }
}


module.exports = {
    saveImage,
}
