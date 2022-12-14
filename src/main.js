// Import Crypto-js library 
const SHA256 = require('crypto-js/sha256');

class Transactions {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        // Timestamp tell us when the block created
        this.timestamp = timestamp;
        // Where hold transactions
        this.transactions = transactions;
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
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    // First block in the blockchain must created manually. Genesis block
    createGenesisBlock() {
        return new Block('04/09/2022', 'Genesis Block', '0');
    }

    // Get the lest block on the blockchain
    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Blok successfully mined!');
        this.chain.push(block);
        this.pendingTransactions = [
            new Transactions(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
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
byeweb2.createTransaction(new Transactions('address1', 'address2', 100));
byeweb2.createTransaction(new Transactions('address2', 'address1', 50));

console.log('\n Starting the miner...');
byeweb2.minePendingTransactions('byeweb2-address');
console.log('\n Balance of byeweb2 is', byeweb2.getBalanceOfAddress('byeweb2-address'));

console.log('\n Starting the miner again...');
byeweb2.minePendingTransactions('byeweb2-address');
console.log('\n Balance of byeweb2 is', byeweb2.getBalanceOfAddress('byeweb2-address'));