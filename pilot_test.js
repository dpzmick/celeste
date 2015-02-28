var io1 = require('socket.io-client')('ws://localhost:3000',
                                      {resource: 'A/socket.io', 'force new connection': true});
var io2 = require('socket.io-client')('ws://localhost:3000',
                                      {resource: 'A/socket.io', 'force new connection': true});

io1.on('message', function (msg) { console.log(msg)} );
io2.on('message', function (msg) { console.log(msg)} );

io1.emit('register', 'pilot', function (done) {
    io2.emit('register', 'engineer', function (done) {
        io1.emit('action', {type:'navigation', to: 'blah1'}, function (res) {
            console.log(res);
            io1.disconnect();
            io2.disconnect();
        });
    });
});

