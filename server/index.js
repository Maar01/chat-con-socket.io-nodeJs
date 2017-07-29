/**
 * Created by mario on 29/07/17.
 */
var express = require('express');
var app_express = express();
var server = require('http').Server(app_express);

var io = require('socket.io')(server);

app_express.use(express.static('client'));

app_express.get('/hola-mundo', function (request, response) {
    response.status(200).send('hola mundo');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat!',
    nickname: 'Server'
}]

io.on('connection', function (socket) {
    console.log('El nodo con ip ' + socket.handshake.address + ' se ha conectado . . .');
    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function(){
    console.log('servidor funcionando');
});
