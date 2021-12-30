const ChainUtil = require('../chain-util')
const { INITIAL_BALANCE } = require('../config')


class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE
    this.keyPair = ChainUtil.genKeyPair()
    this.publicKey = this.keyPair.getPublic().encode('hex')
  }

  toString() {
    return `
     publicKey: ${this.publicKey.toString()}
     balance  : ${this.balance}
    `
  }

  signInput(dataHash) {
    // console.log(dataHash)
      return this.keyPair.sign(dataHash)
  }
}

module.exports = Wallet