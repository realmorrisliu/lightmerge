const io = require('socket.io');

class WS {
  constructor(httpServer) {
    this.io = io(httpServer);
  }

  static getWs(httpServer) {
    if (!this.instance) {
      return new WS(httpServer);
    }
    return this.instance;
  }
}

module.exports = WS.getWs;
