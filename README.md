# Ethereum Contract HoneyPot Analysis

## Disclaimer
**DO NOT USE contracts/CompanyTest.sol IF YOU DON'T KNOW WHAT YOU DO!!!**

## Introduction

The aim of this repository is educational with the objective of demoing the behavior of a [Honeypot](https://en.wikipedia.org/wiki/Honeypot_(computing)) contract on Ethereum.


This repository tests the behavior of contract [0x11f3081CD6b2ac5A263e65E206F806bea7fA9C56](https://etherscan.io/address/0x11f3081CD6b2ac5A263e65E206F806bea7fA9C56#code) for which **I don't claim any authorship**.

### Motivation
While ago I heard about Honeypot Ethereuem contracts, so I decided to start checking contracts that had some relevant value of ETH on the blockchain to understand how they work. After a while I found this contract, with 1.005ETH (in the moment of writing) equivalent to $502.04 USD.

## Understanding the honeypot
This honeypot targets users looking for bad contracts with the objective of taking the Ethereum away from them. At first glance, it seem that the owner of the contract can withdraw all the money of the contract at any moment and that you can become the owner of the contract by just adding more money to contract (more than current value of `largestStake`).

The trick is that function `purchaseStake` in file *contracts/CompanyTest.sol* updates the `owner` variable in `CompanyTest` class but not the `owner` variable in `Ownable` class. In consequence, when running the `withdraw` function the `onlyOwner` modifier uses the `owner` defined in line 4 and is initialized to the creator of the contract on line 7 and not modified anymore.


## Requirements
The tests have been developed using [Truffle Framework](https://truffleframework.com/). You can install it using npm:

```bash
npm install -g truffle
```

You'll need an Ethereum test network, you can use [Ganache](https://truffleframework.com/ganache). It setups a local Ethereum blockchain to run tests.

## Running test
The tests can be run starting the truffle to execute the test:
```bash
truffle test
```

## Tests
The tests performed are simple but enough to show the behavior of the honeypot:
1. The first test demonstrates that the creator of the contract can withdraw all the contract's money when is the *owner* of the contract. This behavior is as expected.
2. The second test demonstrates that the creator of the contract can withdraw all the contract's money when is not the *owner* of the contract. Unexpected behavior when code is not analyzed carefully.
3. The third test demonstrates that the *owner* of the contract can't withdraw the money when is *owner* but it's not the contract's creator. Unexpected behavior when code is not analyzed carefully.