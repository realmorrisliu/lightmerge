const io = require('socket.io');

let socket;
const getSocket = (httpServer) => {
  if (!socket) {
    socket = io(httpServer);
  }
  return socket;
};

module.exports = getSocket;
