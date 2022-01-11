const Websocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 8001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []
const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transaction: 'CLEAR_TRANSACTION'
}

class P2pServer {
  constructor (blockchain, transactionPool) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
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
      switch (data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replaceChain(data.chain)
          break;
        case MESSAGE_TYPES.transaction:
          this.transactionPool.updateOrAddTransaction(data.transaction)
          break;
        case MESSAGE_TYPES.clear_transaction:
          this.transactionPool.clear()
          break;
      }
    })
  }

  sendChain(sk) {
    sk.send(JSON.stringify({
      type: MESSAGE_TYPES.chain,
      chain: this.blockchain.chain
    }))
  }

  sendTransaction(sk, transaction) {
    sk.send(JSON.stringify({
      type: MESSAGE_TYPES.transaction,
      transaction
    }))
  }

  syncChains() {
    this.sockets.forEach(sk => this.sendChain(sk))
  }

  brodcastTransaction(transaction) {
    this.sockets.forEach(sk => this.sendTransaction(sk, transaction))
  }

  brodcastClearTransactions() {
    this.sockets.forEach(sk => sk.send(JSON.stringify({
      type: MESSAGE_TYPES.clear_transaction
    })))
  }
}

module.exports = P2pServer