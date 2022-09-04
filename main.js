// Import Crypto-js library 
const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        // The index option. Tell us where the block sits on the chain
        this.index = index;
        // Timestamp tell us when the block created
        this.timestamp = timestamp;
        // Data might include any type of data
        this.data = data;
        // PreviousHash string that containe the hash of the pervious block
        this.previousHash = previousHash;
        //  Hash of our block we use crypto-js library
        this.hash = this.calculateHash();
    }

    // Calculate our block hash 
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    // Initializing our blockchain
    constructor() {
        // Chain property array of our blocks
        this.chain = [this.createGenesisBlock()];
    }
    // First block in the blockchain must created manually. Genesis block
    createGenesisBlock() {
        return new Block(0, '04/09/2022', 'Genesis Block', '0');
    }
    // Get the lest block on the blockchain
    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    // Add a nea block to the chain 
    addBlock(newBlock) {
        // Set the previous hash to the last block 
        newBlock.previousHash = this.getlatestBlock().hash;
        // calcute hash for new block 
        newBlock.hash = newBlock.calculateHash();
        // Push it the chain array
        this.chain.push(newBlock);
    }
}