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