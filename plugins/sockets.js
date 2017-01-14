exports.register = function (server, options, next) {

    const io = require('socket.io').listen(server.listener);

    io.sockets.on('connection', function (socket) {

        console.log('New connection!', socket.id);

        socket.on('new-order', function (newOrder) {
          console.log('new order', socket.id)
          socket.broadcast.emit('newOrder', newOrder)
        });

        socket.on('new-variety', function (newVariety) {
          console.log('new variety', socket.id)
          socket.broadcast.emit('newVariety', newVariety)
        });

        socket.on('delete-variety', function (variety) {
          console.log('delete variety', socket.id)
          socket.broadcast.emit('deleteVariety', variety)
        });

        socket.on('new-category', function (newCategory) {
          console.log('new category', socket.id)
          socket.broadcast.emit('newCategory', newCategory)
        });

        socket.on('update-category', function (updatedCategory) {
          console.log('update category', socket.id)
          socket.broadcast.emit('updatedCategory', updatedCategory)
        });

        socket.on('delete-category', function (category) {
          console.log('delete category', socket.id)
          socket.broadcast.emit('deleteCategory', category)
        });

        socket.on('update-order-status', function (data) {
          console.log('update order status', socket.id)
          socket.broadcast.emit('updateOrderStatus', data)
        });

        socket.on('delete-order', function (data) {
          console.log('delete order', socket.id)
          socket.broadcast.emit('deleteOrder', data)
        });
    });

    next();
};

exports.register.attributes = {
    name: 'sockets'
};
