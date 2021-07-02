import './App.css';
import React, { Component } from 'react';

import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager: '',
    balance: '',
    players: [],
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getAllPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({
      manager,
      balance,
      players
    });
  }

  Enter = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })
    } catch (err) {
      this.setState({ message: 'ERROR!' });
      console.log(err)
      return
    }

    this.setState({ message: 'You have been entered!' });
  };

  Winner = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    try {
      await lottery.methods.winer().send({
        from: accounts[0]
      })
    } catch (err) {
      this.setState({ message: 'ERROR!' });
      console.log(err)
      return
    }

    this.setState({ message: 'A Winner has been picked!' });
  };


  render() {

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.<br />
          There are currently {this.state.players.length} people entered,<br />
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.Enter}>
          <h4>Join to players</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h1>{this.state.message}</h1>

        <hr />

        <h4>Ready to Pick a winner</h4>
        <button onClick={this.Winner}>Pick a winner!</button>
      </div>
    );
  }
}

export default App;
