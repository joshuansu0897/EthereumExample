'use strict'
const path = require('path')
const fs = require('fs')
const solc = require('solc')

const InboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const contentInboxFile = fs.readFileSync(InboxPath, 'utf8')

const LotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const contentLotteryFile = fs.readFileSync(LotteryPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: contentInboxFile
    },
    'Lottery.sol': {
      content: contentLotteryFile
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))

module.exports = output.contracts