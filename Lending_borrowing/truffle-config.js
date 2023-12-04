require('dotenv').config();
const fs = require('fs');

const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = fs.readFileSync(".secret").toString().trim();
const infura_key = fs.readFileSync(".infura_key").toString().trim();
const etherscan_key = fs.readFileSync(".etherscan_key").toString().trim();

module.exports = {

  networks: {

    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infura_key}`),
      network_id: 5,       // Goerli's id
      chain_id: 5,
      gas: 5500000,
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      networkCheckTimeout: 100000,
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infura_key}`),
      network_id: 11155111,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,
      networkCheckTimeout: 100000,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    }

  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.21",      // Fetch exact version from solc-bin (default: truffle's version)

    }
  },

  api_keys: {
    etherscan: etherscan_key
  },

  plugins: ['truffle-plugin-verify']

};
