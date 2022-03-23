# Mazzaroth-js

[![CircleCI](https://circleci.com/gh/kochavalabs/mazzaroth-js.svg?style=svg)](https://circleci.com/gh/kochavalabs/mazzaroth-js)

Mazzaroth-js is a javascript library that facilitates the interaction with
Mazzaroth nodes from both the browser or from [node-js](https://nodejs.org/en/).
It does this by exporting two clients and some utility functions.

## Node Client

The node client is used to interact with a Mazzaroth node by abstracting some
of the standard node operations. This includes encapsulating the node HTTP
endpoints, signing operations, and the creation of a properly formed HTTP
body. The following functions are exposed:

### Transaction Submit

Submits a Transaction to a Mazzaroth node. These are transactions
that must be signed and will eventually be sent to the backing consensus
pool to be submitted to the blockchain. This includes transactions that
update channel state including contract updates and authorization
transactions. Write transactions are submitted asynchronously and the
results must be looked up by querying the Receipt for the transaction ID that
is returned. Readonly transactions will return the Receipt immediately.

### Lookups

There are several functions that allow you to lookup various information. These
include TransactionLookup, BlockLookup, BlockList, BlockHeaderLookup, BlockHeaderList,
ReceiptLookup, and ChannelAbi. Lookup functions are synchronous read-only requests
that will get the latest state based on the non-consensus node that this lookup hits.

### Transaction Builder

The Transaction builder provides a way to create and sign a transaction to be
submitted with the Transaction Submit function.  The builder provides functionality
to build a Call or Contract type transaction and set all the appropriate fields.
The Transaction is finalized by calling the Sign function, given a private key used
to sign the transaction.

## Installation

This library can be added to your project by using npm to install the
mazzaroth-js package.

```bash
npm install mazzaroth-js
```

## Usage

For a more detailed example of how to use the contract client in conjunction
with our CLI tools, XDR generation, and our XDR code generation tool: see the
full contract [example](https://github.com/kochavalabs/full-contract-example).

### Node-Client

```js
import { NodeClient, Ed25519KeyPairFromSeed, GenerateNonce } from 'mazzaroth-js'

async function demo() {
  // Seed for the account is 0x64.
  const accountSeed = '0'.repeat(64)
  const keyPair = Ed25519KeyPairFromSeed(accountSeed)
  const accountPrivKey = keyPair.priv
  const accountID = keyPair.pub
  const mazzNodeAddr = 'http://localhost:6299'
  const channelID = '0'.repeat(64)
  const nonce = GenerateNonce()
  const blockExpirationNumber = '50'

  // Create a client.
  const client = new NodeClient(mazzNodeAddr)

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 1. Channel Abi lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.ChannelAbi(channelID).then(x => x.toJSON())
  console.log('>>> ChannelAbi')
  console.log(res)

  /*
    {
      version: '0.8.0',
      functions: [
        {
          functionType: 2,
          functionName: 'setup',
          parameters: [],
          returns: [Array]
        }
      ]
    }
  */


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 2. Build the transaction.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const builder = new TransactionBuilder(accountID, channelID)
  const transaction = builder.Call(nonce, blockExpirationNumber).Function('setup').Sign(accountPrivKey)
  console.log('>>> TransactionBuilder')
  console.log(transaction)
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 3. Submit the transaction.
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  res = await client.TransactionSubmit(transaction).then(x => x.toJSON())
  console.log('>>> TransactionSubmit')
  console.log(res)

  /*
    c97718cf2a7eb32b6e781b958907b0a6ded3a2dbf262b2a22e1773ef3ccec631'
  */

  // Wait for the transaction to be completed.
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Save the transaction id.
  const transactionID = res

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 4. Transaction lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.TransactionLookup(channelID, transactionID).then(x => x.toJSON())
  console.log('>>> TransactionLookup')
  console.log(res)

  /*
    {
      sender: '3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29',
      signature: 'cd3b6675801da02f821b31166ba8230fbb3f356fef8d74a3eeb39c328876a41a84deba30b32103c237e5ff60e90690b715abd413fcd12428dec2b3f5656d1803',
      data: {
        channelID: '0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '76466',
        blockExpirationNumber: '5',
        category: { type: 1, data: [Object] }
      }
    }
*/

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 5. Receipt lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.ReceiptLookup(channelID, transactionID).then(x => x.toJSON())
  console.log('>>> ReceiptLookup')
  console.log(res)

  /*
    {
      transactionID: 'c97718cf2a7eb32b6e781b958907b0a6ded3a2dbf262b2a22e1773ef3ccec631',
      status: 1,
      stateRoot: 'dbf6c9dd032b205f3b123f146d2d5106f1c177aaa1ac594b3e4a2814a1fdce14',
      result: 'false',
      statusInfo: ''
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 6. Block Height.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.BlockHeight(channelID).then(x => x.toJSON())
  console.log('>>> BlockHeight')
  console.log(res)

  /*
    { height: '3' }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 7. Block List.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const numberOfBlocks = 1
  const height = res.height-1
  res = await client.BlockList(channelID, height, numberOfBlocks).then(x => x)
  console.log('>>> BlockList')
  console.log(res)

  /*
    [
      {
        header: {
          blockHeight: '2',
          transactionHeight: '6',
          consensusSequenceNumber: '0',
          transactionsMerkleRoot: 'edc695c79edd9be248264dfff787ecc72c2ff762a4555e49ece8683691039248',
          transactionsReceiptRoot: '220fbe9228a86a02f5dbe72d38e1429f334ada18b2d7f3ff08d0464db7f1ce4b',
          stateRoot: 'dbf6c9dd032b205f3b123f146d2d5106f1c177aaa1ac594b3e4a2814a1fdce14',
          previousHeader: '2a812fb66da23b488b8621451c648c807fee235b19144d7c8935512aa9ca89c0',
          status: 0
        },
        transactions: [ [Object], [Object] ]
      }
    ]
  */

  // Save the previous header id.
  const blockID = res[0].header.previousHeader

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 8. Block Header Lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.BlockHeaderLookup(channelID, blockID).then(x => x.toJSON())
  console.log('>>> BlockHeaderLookup')
  console.log(res)

  /*
    {
      blockHeight: '1',
      transactionHeight: '4',
      consensusSequenceNumber: '0',
      transactionsMerkleRoot: '59e4e65812283231936f5d47feb0199d0b62cbf51953740ad95bc6accc3fc480',
      transactionsReceiptRoot: '79a4668dff27414cc5a3cbf7d3be6e9d2af3ef9aff2b7e4e4aa95125a4996cc3',
      stateRoot: 'dbf6c9dd032b205f3b123f146d2d5106f1c177aaa1ac594b3e4a2814a1fdce14',
      previousHeader: '25bd4e8d88855ca58f5e92b850f0bd1f4bcf42dd7f42d57b74dca5880668dbd5',
      status: 0
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 9. Block Lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.BlockLookup(channelID, blockID).then(x => x.toJSON())
  console.log('>>> BlockLookup')
  console.log(res)

  /*
    {
      header: {
        blockHeight: '1',
        transactionHeight: '4',
        consensusSequenceNumber: '0',
        transactionsMerkleRoot: '59e4e65812283231936f5d47feb0199d0b62cbf51953740ad95bc6accc3fc480',
        transactionsReceiptRoot: '79a4668dff27414cc5a3cbf7d3be6e9d2af3ef9aff2b7e4e4aa95125a4996cc3',
        stateRoot: 'dbf6c9dd032b205f3b123f146d2d5106f1c177aaa1ac594b3e4a2814a1fdce14',
        previousHeader: '25bd4e8d88855ca58f5e92b850f0bd1f4bcf42dd7f42d57b74dca5880668dbd5',
        status: 0
      },
      transactions: [
        {
          sender: '3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29',
          signature: '81694afd7e051422be392b7fa3583e28f09e0a6130bd4b23f47ada5c77fd5714b26ad11ef71503bc30dca24b56804fdf82fc634ddb487661aaca1d5f27833d09',
          data: [Object]
        },
        {
          sender: '3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29',
          signature: '429108eafbf249cb8e0e24bd3d8f11720e1f661a58b0d24bddb14e38312b9f23c1ab9cb16f516d9650793d21795d075ef0d09a58b60d0ea29a20415553c49109',
          data: [Object]
        }
      ]
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 10. Block Header List.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.BlockHeaderList(channelID, height, numberOfBlocks).then(x => x)
  console.log('>>> BlockHeaderList')
  console.log(res)

  /*
    [
      {
        blockHeight: '2',
        transactionHeight: '6',
        consensusSequenceNumber: '0',
        transactionsMerkleRoot: 'edc695c79edd9be248264dfff787ecc72c2ff762a4555e49ece8683691039248',
        transactionsReceiptRoot: '220fbe9228a86a02f5dbe72d38e1429f334ada18b2d7f3ff08d0464db7f1ce4b',
        stateRoot: 'dbf6c9dd032b205f3b123f146d2d5106f1c177aaa1ac594b3e4a2814a1fdce14',
        previousHeader: '2a812fb66da23b488b8621451c648c807fee235b19144d7c8935512aa9ca89c0',
        status: 0
      }
    ]
  */
}

demo()
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
