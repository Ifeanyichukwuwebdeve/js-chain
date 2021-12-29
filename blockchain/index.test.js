const Blockchain = require('./index')
const Block = require('./block')

describe('Blockchain', () => {
  let bc, bc2

  beforeEach(() => {
    bc = new Blockchain()
    bc2 = new Blockchain()
  })

  it('Starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis())
  })

  it('Adds a new block', () => {
    const data = 'foo'
    bc.addBlock(data)

    expect(bc.chain[bc.chain.length-1].data).toEqual(data)
  })

  it('Validates a valid chain', () => {
    bc2.addBlock('foo')
    
    expect(bc.isValidChain(bc2.chain)).toBe(true)
  })

  it('Invalidates a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'fuck shit'
    
    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it('Replaces the chain with a valid chain', () => {
    bc2.addBlock('I love chibruma')
    bc.replaceChain(bc2.chain)

    expect(bc.chain).toEqual(bc2.chain)
  })

  it('Replaces the chain with a valid chain', () => {
    bc.addBlock('I love chibruma')
    bc.replaceChain(bc2.chain)

    expect(bc.chain).not.toEqual(bc2.chain)
  })
})