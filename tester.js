var io = require('socket.io-client')('ws://localhost:3000');

console.log('here');

io.emit('register', 'pilot');
console.log('here');
io.emit('action', {type:'navigation', place: 'blah'});
console.log('here');
