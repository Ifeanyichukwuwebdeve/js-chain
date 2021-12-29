const express = require('express')
const Blockchain = require('./blockchain')

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
const bc = new Blockchain()

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  res.redirect('/blocks')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})