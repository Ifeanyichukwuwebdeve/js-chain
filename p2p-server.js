const Websocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 8001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2pServer {
  constructor (blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }

  listen () {
    const server = new Websocket.Server({ port: P2P_PORT })
    server.on('connection', sk => this.connectSocket(sk))
    this.connectToPeer()
    console.log(`P2P server ${P2P_PORT}`)
  }

  connectToPeer() {
    peers.forEach(peer => {
      const socket = new Websocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    })
  }

  connectSocket(sk) {
    this.sockets.push(sk)
    console.log('Socket connected')
    this.messageHandler(sk)
    
    this.sendChain(sk)
  }

  messageHandler(sk) {
    sk.on('message', msg => {
      const data = JSON.parse(msg)
      
      this.blockchain.replaceChain(data)
    })
  }

  sendChain(sk) {
    sk.send(JSON.stringify(this.blockchain.chain))
  }

  syncChains() {
    this.sockets.forEach(sk => this.sendChain(sk))
  }
}

module.exports = P2pServer