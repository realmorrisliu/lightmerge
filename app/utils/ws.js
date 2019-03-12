const io = require('socket.io');

class WS {
  constructor(httpServer) {
    this.io = io(httpServer);
  }

  static newWs(httpServer) {
    if (!this.instance) {
      this.instance = new WS(httpServer);
    }
  }

  static getWs() {
    return this.instance;
  }
}

export default WS;
