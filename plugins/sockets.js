exports.register = function (server, options, next) {

    var io = require('socket.io').listen(server.listener);

    io.sockets.on('connection', function (socket) {

        console.log('New connection!', socket.id);

        socket.on('new-order', function (newOrder) {
          console.log('new order', socket.id)
          io.emit('newOrder', newOrder)
        });
    });

    next();
};

exports.register.attributes = {
    name: 'sockets'
};
