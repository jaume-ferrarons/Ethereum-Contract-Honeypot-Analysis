# Ethereum Contract Honeypot Analysis

## Disclaimer
**DO NOT USE contracts/CompanyTest.sol IF YOU DON'T KNOW WHAT YOU DO!!!**

## Introduction

The aim of the source code included in this repository is to demo the behavior of [Honeypot](https://en.wikipedia.org/wiki/Honeypot_(computing)) contract on Ethereum.


This repository tests the behavior of contract [0x11f3081CD6b2ac5A263e65E206F806bea7fA9C56](https://etherscan.io/address/0x11f3081CD6b2ac5A263e65E206F806bea7fA9C56#code) for which **I don't claim any authorship**.

## Requirements
The tests have been developed using [Truffle Framework](https://truffleframework.com/). You can install it using npm:

```bash
npm install -g truffle
```

You'll need an Ethereum test network, you can use [Ganache](https://truffleframework.com/ganache) it setups a local Ethereum blockchain to run tests.

## Running test
The tests can be run starting the truffle to execute the test:
```bash
truffle test
```

## Tests
The test performed are simple but enough to show the behavior of the honeypot:
1. The first test demonstrates that the creator of the contract can withdraw all the contract's money when is the *owner* of the contract. This behavior is as expected.
2. The second test demonstrate that the creator of the contract can withdraw all the contract's money when is not the *owner* of the contract. Unexpected behavior when code is not analyzed carefully.
3. The third test demonstrate that the *owner* of the contract can't withdraw the money when is *owner* but it's not the contract's creator. Unexpected behavior when code is not analyzed carefully.
