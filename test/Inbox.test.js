'use strict'
const Web3 = require('web3')
const ganache = require('ganache-cli')
const assert = require('assert')

const Inbox = require('../compile').Inbox

const web3 = new Web3(ganache.provider())

let accounts = undefined
let contractInbox = undefined

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  contractInbox = await new web3.eth.Contract(Inbox.abi)
    .deploy({ data: Inbox.evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
  it('deploy a contract', () => {
    console.log(contractInbox)
  })
})