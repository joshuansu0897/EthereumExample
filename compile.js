'use strict'
const path = require('path')
const fs = require('fs')
const solc = require('solc')
const { CLIENT_RENEG_LIMIT } = require('tls')

const InboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const contentInboxFile = fs.readFileSync(InboxPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: contentInboxFile
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

console.log(JSON.stringify(output, null, 4))
console.log(output);