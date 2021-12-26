const Block = require('./block')

const fooBlock = Block.mineBlock(Block.genesis(), ['foo', 434, 'John','kingifean@gmail.com'])

console.log(fooBlock.toString())
// console.log(Block.genesis().toString())