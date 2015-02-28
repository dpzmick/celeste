var io = require('socket.io-client')('ws://localhost:3000');

io.emit('register', 'pilot', function (done) {
    io.emit('action', {type:'navigation', from: 'blah', to: 'blah1'}, function (res) {
        console.log(res);
        io.disconnect();
    });
});
