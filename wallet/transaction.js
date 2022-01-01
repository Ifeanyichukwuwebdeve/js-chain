const ChainUtil = require('../chain-util')

class Transaction {
  constructor() {
    this.id = ChainUtil.id()
    this.input = null
    this.outputs = []
  }

  update(senderWallet, recipient, amount) {
    const sendersOutput = this.outputs.find(output => output.address === senderWallet.publicKey)

    if(amount > sendersOutput.amount) {
      console.log(`Amount: ${amount} ammount exceeds balance.`)
      return
    }

    sendersOutput.amount -= amount
    this.outputs.push({amount, address: recipient})
    Transaction.signTransaction(this, senderWallet)

    return this
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this()

    if(amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`)
      return
    }

    transaction.outputs.push(...[
      {amount: senderWallet.balance - amount, address: senderWallet.publicKey},
      {amount, address: recipient}
    ])

    Transaction.signTransaction(transaction, senderWallet)

    return transaction
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timeStamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.signInput(ChainUtil.hash(transaction.outputs))
    }
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(transaction.input.address, transaction.input.signature, ChainUtil.hash(transaction.outputs))
  }
}

module.exports = Transaction