const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración del servidor de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Manejo de conexión de clientes
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejo de eventos de chat
  socket.on('chat message', (message) => {
    console.log('Mensaje recibido:', message);
    io.emit('chat message', message);
  });

  // Manejo de desconexión de clientes
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const port = 8080;
server.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
