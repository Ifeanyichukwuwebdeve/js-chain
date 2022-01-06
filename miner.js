class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.wallet = wallet
    his.p2pServer = p2pServer
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions()
    // include a reward for the miner
    // create a new block consisting  of the valid transactions,
    // synchronize the chains in the peer to peer network
    // clear the transaction pool
    // brodcast to every miner to clear thier transaction pools
  }
}

module.exports = Miner