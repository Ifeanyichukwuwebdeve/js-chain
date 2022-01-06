const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index')

describe('Transaction pool', () => {
  let tp, transaction, wallet

  beforeEach(() => {
    tp = new TransactionPool()
    wallet = new Wallet()
    transaction = wallet.createTransaction('r4nd-4dr355', 30, tp)
  })

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction)
  })

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction)
    // console.log(tp.transactions)
    const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40)
    tp.updateOrAddTransaction(newTransaction)
    // console.log(tp.transactions)
    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction)
  })

  describe('mixing valid and corrupt transactions', () => {
    let validTransactions

    beforeEach(() => {
      validTransactions = [...tp.transactions]
      for(i=0; i<6; i++) {
        wallet = new Wallet()
        transaction = wallet.createTransaction('r4nd-4dr355', 30, tp)
        if (i%2==0) {
          transaction.input.amount = 99999
        } else {
          validTransactions.push(transaction)
        }
      }
    })

    it('shows a difference between valid and corrupt transactions', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions))
    })

    it('grabs valid transaction', () => {
      expect((tp.validTransactions())).toEqual(validTransactions)
    })
  })
})