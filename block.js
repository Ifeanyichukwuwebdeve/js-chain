class Block {
  constructor (timeStamp, lastHash, hash, data) {
    this.timeStamp = timeStamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  toString() {
    return `Block --
      Time Stamp: ${this.timeStamp}
      Last Hash: ${this.lastHash.substring(0, 10)}
      Hash     : ${this.hash.substring(0, 10)}
      Data     : ${this.data}
    `
  }

  static genesis() {
    return new this('Genesis time', '---', 'fi1-rfss', ['ftes', 234])
  }

  static mineBlock(lastBlock, data) {
    const timeStamp = Date.now()
    const lastHash = lastBlock.hash
    const hash = 'todo-hash'

    return new this(timeStamp, lastHash, hash, data)
  }
}

module.exports = Block