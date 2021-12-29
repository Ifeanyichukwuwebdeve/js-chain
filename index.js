const express = require('express')
const Blockchain = require('./blockchain')
const P2pServer = require('./p2p-server')

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  p2pServer.syncChains()
  res.redirect('/blocks')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
p2pServer.listen()