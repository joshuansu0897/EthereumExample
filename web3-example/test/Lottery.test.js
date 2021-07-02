'use strict'
const Web3 = require('web3')
const ganache = require('ganache-cli')
const assert = require('assert')

const Lottery = require('../compile')['Lottery.sol'].Lottery

const web3 = new Web3(ganache.provider())

let accounts = undefined
let contractLottery = undefined

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  contractLottery = await new web3.eth.Contract(Lottery.abi)
    .deploy({ data: Lottery.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Lottery', () => {
  it('contract was deployed', () => {
    assert.ok(contractLottery.options.address)
  })

  it('allow one account to enter', async () => {
    await contractLottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    })

    const players = await contractLottery.methods.getAllPlayers().call({
      from: accounts[0]
    })

    assert.strictEqual(players[0], accounts[0])
    assert.strictEqual(players.length, 1)
  })

  it('allow multiple accounts to enter', async () => {
    await contractLottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    })

    await contractLottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    })

    await contractLottery.methods.enter().send({
      from: accounts[3],
      value: web3.utils.toWei('0.02', 'ether')
    })

    const players = await contractLottery.methods.getAllPlayers().call({
      from: accounts[0]
    })

    assert.strictEqual(players[0], accounts[1])
    assert.strictEqual(players[1], accounts[2])
    assert.strictEqual(players[2], accounts[3])
    assert.strictEqual(players.length, 3)
  })

  it('require a minimum amount of ether to enter', async () => {
    try {
      await contractLottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.009', 'ether')
      })
      assert(false)
    } catch (error) {
      assert(error)
    }
  })

  it('only manager can call winer', async () => {
    try {
      await contractLottery.methods.winer().send({
        from: accounts[1]
      })
      assert(false)
    } catch (error) {
      assert(error)
    }
  })

  it('full workflow', async () => {
    await contractLottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('5', 'ether')
    })

    const initBalance = await web3.eth.getBalance(accounts[0])

    await contractLottery.methods.winer().send({
      from: accounts[0]
    })

    const finalBalance = await web3.eth.getBalance(accounts[0])

    const difference = finalBalance - initBalance

    assert(difference > web3.utils.toWei('4.8', 'ether'))
  })
})