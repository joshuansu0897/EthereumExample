import web3 from './web3';

const address = '0xcc766Bab001dcF1c2c72610d1f480fDD95c3913f';

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true,
    "signature": "0xe97dcb62"
  },
  {
    "inputs": [],
    "name": "getAllPlayers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xefa1c482"
  },
  {
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x481c6a75"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xf71d96cb"
  },
  {
    "inputs": [],
    "name": "winer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd426b5d4"
  }
];

export default new web3.eth.Contract(abi, address);