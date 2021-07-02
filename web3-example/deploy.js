'use strict'
require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")

const Inbox = require('./compile')['Inbox.sol'].Inbox
const Lottery = require('./compile')['Lottery.sol'].Lottery

const mnemonicPhrase = process.env.WORDS
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`
})

const web3 = new Web3(provider)

async function deploy() {
  const accounts = await web3.eth.getAccounts()

  console.log(`should be my account ${accounts[0]}`)

  const contractInbox = await new web3.eth.Contract(Inbox.abi)
    .deploy({ data: Inbox.evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })

  console.log(`Contract deployed to ${contractInbox.options.address}`)

  const contractLottery = await new web3.eth.Contract(Lottery.abi)
    .deploy({ data: Lottery.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })

  console.log(`Contract deployed to ${contractLottery.options.address}`)
}

deploy()