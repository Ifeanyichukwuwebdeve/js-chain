# Simple Blockchain Code

This is the backend api for a Simple poW blockchain

## Features

- Creation of wallets and tractions
- Block mining with the poW
- A simple steller token

## Endpoints

- /transact : Create a new transaction with wallet
- /public-key : Get wallet public key
- /transactions : list of transactions
- /blocks : Get all the blocks on chain
- /mine : manually mine a block
- /mine-transaction : mining transactions as a poW miner and get reward after a valid work
- /steller-accounts : Get steller public keys


## Run Locally

In order to run the project locally, you will need to perform the following steps to get the api installed on your machine:

Clone the project

```bash
  git clone https://github.com/greatAdams01/js-chain.git
```

Install dependencies

```bash
  yarn or npm i
```

Run server

```bash
  yarn dev or
  npm run dev
```