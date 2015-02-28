var io = require('socket.io-client')('ws://localhost:3000');

io.emit('register', 'pilot');
io.emit('action', {type:'navigation', from: 'blah', to: 'blah1'});
