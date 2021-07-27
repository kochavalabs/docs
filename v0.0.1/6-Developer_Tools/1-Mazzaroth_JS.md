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

### transactionSubmit

Submits a write transaction to a Mazzaroth node. These are transactions
that must be signed and will eventually be sent to the backing consensus
pool to be submitted to the blockchain. This includes transactions that
update channel state including contract updates and authorization
transactions. Write transactions are submitted asynchronously and the
results must be looked up by querying the Receipt for the transaction.

### readonlySubmit

Submits a read-only transaction to a Mazzaroth node. Read-only transactions
do not update channel state so they will return a result immediately
without hitting the consensus pool.

### Lookups

There are several functions that allow you to lookup various information. These
include transactionLookup, blockLookup, blockHeaderLookup, receiptLookup,
nonceLookup, accountInfoLookup and channelInfoLookup. Lookup functions are
synchronous read-only requests that will get the latest state based on the
non-consensus node that this lookup hits.

## Contract Client

The contract client provides further abstraction for interaction with Mazzaroth
nodes on top of the node client. The idea is to build an object that you can
call contract functions on abstracting the details of the blockchain. A
contract client is constructed using an abiJSON, nodeClient, and any custom
XDR types defined for the contract. It will then dynamically build the functions
exposed by the contract and allow you to call as simple async functions.

## Utility Functions

There are also some utility functions exported to help with common operations.
This includes [EventSubscription](https://mazzaroth.io/docs/4-Event_Subscription/3-Tools.md),
running [ExecutionPlans](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/plan.x)
, getting an address from a private key and XDR<->JSON conversion helpers.

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

To run the sample code execute the following commands.

Spawn a local Mazzaroth node.

```bash
docker run -p 8081:8081 kochavalabs/mazzaroth start standalone
```

Deploy the contract stated above.

```bash
mazzaroth-cli deploy deploy.json
```

### Node-Client

```js
import { NodeClient, AddressFromPrivate } from 'mazzaroth-js'

async function demo() {
  // Private key for the account is 0x64.
  const accountPrivKey = '0'.repeat(64)
  const mazzNodeAddr = 'http://localhost:8081'
  const accountID = AddressFromPrivate(accountPrivKey).toString('hex')
  const channelID = '0'.repeat(64)
  const blockExpirationNumber = '0'

  // Create a client.
  const client = new NodeClient(mazzNodeAddr, accountPrivKey)

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 1. Get account info.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  let res = await client.accountInfoLookup(accountID).then(x => x.toJSON())
  console.log('>>> accountInfoLookup')
  console.log(res)

  /*
    {
      accountInfo: { name: '', nonce: '144', permissionedKeys: [] },
      stateStatus: { previousBlock: '0', transactionCount: '160' },
      status: 1,
      statusInfo: 'Found info for account.'
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 2. Channel info lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const configType = 2
  res = await client.channelInfoLookup(configType).then(x => x.toJSON())
  console.log('>>> channelInfoLookup')
  console.log(res)

  /*
    {
      channelInfo: {
        enum: 2,
        value: {
          owner: '3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29',
          channelName: 'Example Channel',
          admins: []
        }
      },
      stateStatus: { previousBlock: '0', transactionCount: '160' },
      status: 1,
      statusInfo: 'Found info for channel.'
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 3. Submit the transaction.
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  // Make a contract function call. To the contract function 'args' which takes
  // three strings parameters.
  let action = {
    channelID: channelID,
    nonce: res.nonce,
    blockExpirationNumber: blockExpirationNumber,
    // The category of this call is a transaction submission.
    // These categories are defined here under ActionCategoryType:
    // https://github.com/kochavalabs/mazzaroth-xdr/blob/develop/idl/transaction.x
    category: {
      enum: 1,
      value: {
        function: 'args',
        // Parameters are a variable length string xdr representation. They should
        // be formatted to JSON if sending a complex struct.
        parameters: ['abc', 'def', 'ghijklm']
      }
    }
  }

  res = await client.transactionSubmit(action).then(x => x.toJSON())
  console.log('>>> transactionSubmit')
  console.log(res)

  // The synchronous version is -> ```res = await client.transactionForReceipt(action).then(x => x.toJSON())```

  /*
    {
      transactionID: '44b073a621b88df2345024b6584dee1421c44f05f6ddb50a94cbc5ff01c713ea',
      status: 1,
      statusInfo: 'Transaction has been accepted and is being executed.'
    }
  */

  // Wait for the transaction to be completed.
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Save the transaction id.
  const transactionID = res.transactionID

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 4. Transaction lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.transactionLookup(transactionID).then(x => x.toJSON())
  console.log('>>> transactionLookup')
  console.log(res)

  /*
    {
      transaction: {
        signature: 'e081a76c8b96647eca51ca140f0d973b8def0f2ba697799661e43873a82fbfb670b54abd0de5a63cec34cbb976adbb8e2db4a58905a8c937b122bbd1aeeb8c00',
        signer: { enum: 0, value: '' },
        action: {
          address: '3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29',
          channelID: '0000000000000000000000000000000000000000000000000000000000000000',
          nonce: '144',
          category: [Object]
        }
      },
      stateStatus: { previousBlock: '0', transactionCount: '161' },
      status: 3,
      statusInfo: 'Transaction has been accepted and is being executed.'
    }
*/

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 5. Receipt lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.receiptLookup(transactionID).then(x => x.toJSON())
  console.log('>>> receiptLookup')
  console.log(res)

  /*
    {
      receipt: {
        status: 1,
        stateRoot: 'd234cd483e339f6186598dc4f79c3f1be7c7c12c01ba873ed51f1da1d19e8b53',
        result: '13',
        statusInfo: ''
      },
      stateStatus: { previousBlock: '0', transactionCount: '161' },
      status: 1,
      statusInfo: 'Receipt successfully found.'
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 6. Block lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.blockLookup(res.stateStatus.previousBlock).then(x => x.toJSON())
  console.log('>>> blockLookup')
  console.log(res)

  /*
    {
      block: {
        header: {
          timestamp: '',
          blockHeight: '0',
          transactionHeight: '0',
          consensusSequenceNumber: '0',
          txMerkleRoot: '0000000000000000000000000000000000000000000000000000000000000000',
          txReceiptRoot: '0000000000000000000000000000000000000000000000000000000000000000',
          stateRoot: '0000000000000000000000000000000000000000000000000000000000000000',
          previousHeader: '0000000000000000000000000000000000000000000000000000000000000000',
          blockProducerAddress: '0000000000000000000000000000000000000000000000000000000000000000'
        },
        transactions: []
      },
      stateStatus: { previousBlock: '0', transactionCount: '161' },
      status: 3,
      statusInfo: 'key not found in kv store'
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 7. Block header lookup.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.blockHeaderLookup(res.stateStatus.previousBlock).then(x => x.toJSON())
  console.log('>>> blockHeaderLookup')
  console.log(res)

  /*
    {
      header: {
        timestamp: '',
        blockHeight: '0',
        transactionHeight: '0',
        consensusSequenceNumber: '0',
        txMerkleRoot: '0000000000000000000000000000000000000000000000000000000000000000',
        txReceiptRoot: '0000000000000000000000000000000000000000000000000000000000000000',
        stateRoot: '0000000000000000000000000000000000000000000000000000000000000000',
        previousHeader: '0000000000000000000000000000000000000000000000000000000000000000',
        blockProducerAddress: '0000000000000000000000000000000000000000000000000000000000000000'
      },
      stateStatus: { previousBlock: '0', transactionCount: '161' },
      status: 3,
      statusInfo: 'key not found in kv store'
    }
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 8. Read only.
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  res = await client.readonlySubmit("simple").then(x => x.toJSON())
  console.log('>>> readonlySubmit')
  console.log(res)

  /*
    {
      result: 'Hello World!',
      stateStatus: { previousBlock: '0', transactionCount: '161' },
      status: 1,
      statusInfo: 'Readonly request executed successfully.'
    }
  */
}

demo()
```

### Contract-Client

```js
import { NodeClient, ContractClient } from 'mazzaroth-js'

// First construct a node client to be used by the contract client.
// Private key for the account is 3x64
const accountPrivKey = '3'.repeat(64)
const mazzNodeAddr = 'http://localhost:8081'
const channelID = '0'.repeat(64)

const nodeClient = new NodeClient(mazzNodeAddr, accountPrivKey)

// This is an example abi.
const helloAbi = JSON.parse(`
[
  {
    "type": "function",
    "name": "hello_world",
    "inputs": [
      {
        "name": "my_name",
        "type": "string",
        "codec": "bytes"
      },
    ],
    "outputs": [
      {
        "name": "returnValue0",
        "type": "string",
        "codec": "bytes"
      }
    ]
  },
]
`)

// Construct a contract client and then call the contract functions.
// Third argument is empty because we have no xdr types for this contract.
const contractClient = new ContractClient(helloAbi, nodeClient, {}, channelID)

contractClient.hello_world('Mazzaroth Dev').then(result => console.log(result))
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
