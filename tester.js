var io = require('socket.io-client')('ws://localhost:3000');

io.emit('register', 'pilot');
io.emit('action', {type:'navigation', place: 'blah'});


//io.emit('register', 'engineer');
//console.log('here');
//io.emit('action', {type:'allocate', system: 'shields'});
//console.log('here');
