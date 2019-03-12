const io = require('socket.io');

class WS {
  static instance;

  constructor(httpServer) {
    if (!WS.instance) {
      this.io = io(httpServer);
      WS.instance = this;
    }

    return WS.instance;
  }
}

module.exports = WS;
