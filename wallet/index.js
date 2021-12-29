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

  async signInput(dataHash) {
    try {
      return await this.keyPair.sign(dataHash)
    } catch (error) {
      error
    }
  }
}

module.exports = Wallet