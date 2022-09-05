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
        // Number that mine the new block
        this.nonce = 0;
    }

    // Calculate our block hash 
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }
    
    // Implement Proof of Work 
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty +  1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    // Initializing our blockchain
    constructor() {
        // Chain property array of our blocks
        this.chain = [this.createGenesisBlock()];
        // Difficulty number to find the right hash 
        this.difficulty = 5;
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
        // Mine newBlock 
        newBlock.mineBlock(this.difficulty);
        // Push it the chain array
        this.chain.push(newBlock);
    }
    // Check if the block valid on the chain
    isChainValid() {
        // Loop throw all blocks 
        for (let i = 1; i < this.chain.length; i++) {
            // Grap the current Block
            const currentBlock = this.chain[i];
            // Grap The previus block of the current one
            const previousBlock = this.chain[i - 1];
            // Check if the hash of the block is still valid 
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            // Check the previos hash is not equal to the hash of our previous block
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            } 
        }

        return true;
    }
}

let byeweb2 = new Blockchain();

console.log("Mining block 1...");
byeweb2.addBlock(new Block(1, "05/09/2022", { amount: 4 }));
console.log("Mining block 2...");
byeweb2.addBlock(new Block(2, "05/09/2022", { amount: 10 }));