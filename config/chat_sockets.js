
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000"
        }
    });

    // whenever connection req is received
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        //  when join_room eent is emitted, it is recieved here
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            // if data.chatroom exists, it will join into the chatroom, otherwise it will create chatroom
            socket.join(data.chatroom);
            // when you joined the room, every other members should receive a notification that new user joined
            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}