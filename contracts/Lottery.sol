// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether);
        
        players.push(msg.sender);
    }
    
    function winer() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }
    
    function getAllPlayers() public view returns (address[] memory) {
        return players;
    } 
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}