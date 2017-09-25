var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 6677

app.use(express.static('client'));

app.get('/hola-mundo',function(request,response){
response.status(200).send('Hola mundo');
});

var messages = [{
    id:1,
    text:'Bienvenido al chat de Eyelabs',
    nickname:'Bot - eyelabsar.com'
}]

io.on('connection',function(socket){
    console.log("El nodo con Ip: "+socket.handshake.address +" se ha conectado");
    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);

    });

});

server.listen(port,function(){
console.log('Server Online en http://localhost:'+port);

});