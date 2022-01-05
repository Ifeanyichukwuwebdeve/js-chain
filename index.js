const express = require('express')
const { redirect } = require('express/lib/response')
const Blockchain = require('./blockchain')
const P2pServer = require('./p2p-server')
const Wallet = require('./wallet')
const TransactionPool = require('./wallet/transaction-pool')

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
const bc = new Blockchain()
const wallet = new Wallet()
const tp = new TransactionPool()
const p2pServer = new P2pServer(bc)

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  p2pServer.syncChains()
  res.redirect('/blocks')
})

app.get('/transactions', (req, res) => {
  res.json(tp.transactions)
})

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body
  const transaction = wallet.createTransaction(recipient, amount, tp)
  res.redirect('/transactions')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
p2pServer.listen()