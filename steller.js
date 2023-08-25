const StellarSdk = require("stellar-sdk");


class StellerService {
  constructor() {
    this.accounts = [ {
      name: "Issuer", 
      public_key: "GAFS2ZAEEEQIRXYP75FQIAHDYVE3NCNIZB4ACIMYY3JB4RAS2QYTCE2J",
      secret_key: "SAZZBQK4ZQR7NZFKHEQW3PCD6BFZHMRH3OLC6AY4KN4UKQ7RP5WWLCFZ"
    },
    {
      name: "Distributor", 
      public_key: "GAJHI6COUP6GH7HE3PMPHWZC4IX33Y6H4KJ6R25ZVP6LCPSTNAILAOWT",
      secret_key: "SDGQWCR72OLCTYLDVKNDYF5GBUZR2HRD4NATVXSECHP5ZA6H5LLUMELT"
    },
    {
      name: "Buyer", 
      public_key: "GBZRLSIQMNJJDRPSBD4EFOEWFC5T3EEGQCIWL75VNBZQNVEIUM2LJNZI",
      secret_key: "SAWTUQOYV5OHUUEIT4ZPRFYF2NMBC3RAZOIXNYG3Q7URI35S76XMSGE7"
    }
  ]
    this.server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

    this.greatAdams01 = ''
  }

  async createAssest () {
    const issuingKeys = StellarSdk.Keypair.fromSecret(
      this.accounts[0].secret_key,
    );
    const receivingKeys = StellarSdk.Keypair.fromSecret(
      this.accounts[1].secret_key,
    );
    // / Create an object to represent the new asset
  const greatAdams01 = new StellarSdk.Asset("GreatAdams01", issuingKeys.publicKey());
  this.greatAdams01 = greatAdams01

  const server = this.server

  // First, the receiving account must trust the asset
  server
    .loadAccount(receivingKeys.publicKey())
    .then(function (receiver) {
      console.log(receiver)
      var transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        // The `changeTrust` operation creates (or alters) a trustline
        // The `limit` parameter below is optional
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: greatAdams01,
            limit: "10000",
          }),
        )
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
      transaction.sign(receivingKeys);
      return server.submitTransaction(transaction);
    })
    .then(console.log)

    // Second, the issuing account actually sends a payment using the asset
    .then(function () {
      return server.loadAccount(issuingKeys.publicKey());
    })
    .then(function (issuer) {
      console.log(issuer)
      var transaction = new StellarSdk.TransactionBuilder(issuer, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: receivingKeys.publicKey(),
            asset: greatAdams01,
            amount: "10000",
          }),
        )
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
      transaction.sign(issuingKeys);
      return server.submitTransaction(transaction);
    })
    .then(console.log)
    .catch(function (error) {
      console.error("Error!", error.response.data.extras);
    });

  }

  

  getAccounts () {
    return this.accounts.map(acct => {
      return {
        name: acct.name,
        public_key: acct.public_key
      }
    })
  }



}
module.exports = StellerService
