import ApiSchema from '@theme/ApiSchema';

# Blockchain

## Smart Contracts

A Mazzaroth Smart Contract is a WebAssembly binary that defines the functions
that may be called by transactions submitted to the channel and how data is
stored in state for that channel. There are many different ways to write code
that can be compiled to Web Assembly. The requirement for it to be considered
a Mazzaroth Smart Contract is that it includes a main function and handles the
input object correctly. The way this is done will vary depending on the language
that is being compiled to WebAssembly so it would be helpful to use a library
that provides these features.
See [below](#Writing-a-Smart-Contract) for more information about writing contracts.

A Channel in Mazzaroth can contain a single contract that may be updated by the
Channel owner. Once a Smart Contract has been deployed to a channel other users
may interact with the channel by submitting transactions to call exported functions
of the contract.

Smart Contracts have access to the Mazzaroth host system interface and can
define how [State](#State-Database) gets updated during function execution.

### Life Cycle

The basic steps of a Transaction's lifecycle in Mazzaroth are as follows:

A transaction is created by a user and is signed by their account or an authorized
account for the sender of the transaction.

The transactions are submitted to a Readonly Node in the targeted network using the
`transactions` RPC API endpoint.

The Readonly Node performs some basic validation, such as checking that the Transaction
is properly signed and includes the proper channel ID. If the Validation succeeds
the Readonly Node will send the Transaction to a Consensus node in the network and
return the Transaction ID in the submit response.

When a Consensus Node receives a Transaction from a Readonly Node it performs similar
validation on the signature and channel ID, then submits the transaction to the Consensus
protocol. The participating Consensus nodes use a form of the Practical Byzantine
Fault Tolerance (PBFT) consensus protocol to order the transactions that have been
submitted. Once ordering has finalized each Consensus Node will execute the transaction,
update the ledgers, and gossip the transaction back to Readonly Nodes.

Readonly Nodes that receive transactions from Consensus will queue the transactions
to ensure that they are executed in the correct order. Once they have the next transactions
to execute they will execute them and update their own ledgers.

A user can use the `transactions` API with the Transaction ID to check if
a transaction has been finalized.

## Ledger

The Ledger is a digital record of blocks and transactions that have been accepted
into the Blockchain. The Blockchain itself can be thought of as a distributed
ledger. Every node keeps its own copy of the ledger.

### Blocks

See XDR definition [here](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/block.x).

A block contains a block header and a list of transactions. Blocks are stored
in the ledger and are able to be looked up by the block number or by the block
header hash. Each block includes the hash of the previous block header, which
links the two and forms the block chain. See below for a complete list of
fields stored in a Block and Block Header Object along with their description.

<ApiSchema pointer="#/definitions/Block" />

### Transactions

See XDR definition [here](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/transaction.x).

A transaction contains an action, which gets processed by the
Mazzaroth Virtual Machine (RothVM) on a channel. This can do things such as
Update a Contract, Call a Function, or set permissions on an account.
After a non-readonly transactions has gone through consensus and
has been executed within the RothVM it is added to the ledger. Once a
transaction has been added to the ledger it may be retrieved by using the
transaction ID which is the unique hash of the Transaction object itself.
It must be signed by either the sending account owner or an
authorized signer for an account. See below for a list of the fields and
descriptions stored in a Transaction Object.

<ApiSchema pointer="#/definitions/Transaction" />

#### Contract

Transactions may also be used to update the Contract state of a channel. A
channel can only have one contract that defines the functions available. The
contract is set by the owner through a Deploy Transaction. See the
[Contract Object](#Contract-Object) above for an example of how this field can be
set on a transaction.

Example Deploy Transaction JSON:

```JSON
{
 "sender": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29",
 "signature": "41673b6ca7d17463a722ce6c2b9c0e5f68bf6f4d085530476c60341e11eb926305ea9730884a7807faf2484a5e6e8cef566479eea21628fcb3da2f48ab235bf3",
 "data": {
  "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "5304039207213195818",
  "blockExpirationNumber": "100",
  "category": {
   "type": 2,
   "data": {
    "version": "0.0.1",
    "owner": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29",
    "abi": {
     "version": "0.8.0",
     "functions": [],
    },
    "contractHash": "6f5a561f67c1e874140ef682914e616a422fd336b67576709738876ca37080d1",
    "contractBytes": "contract bytes"
   }
  }
 }
}
```

### Receipts

See XDR definition [here](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/receipt.x).

Receipts are the stored results from the execution of a transaction.
Receipts for every transaction that is accepted by Consensus are stored, along
with the transaction itself, in the ledger. Receipts may be looked up by the
Transaction ID use the Mazzaroth RPC API on a Readonly node.

<ApiSchema pointer="#/definitions/Receipt" />

## State Database

The Mazzaroth Virtual Machine (RothVM) contains a State Database that stores all
of the data necessary for the channel. The Database is used to store and access
objects for a channel and is backed by a Merkle Tree. The State DB may get updated
as a result of Transaction execution, such as by updating the Contract store in state
or by executing a contract function that stores a value. The Merkle root of the
State DB is stored in block headers when blocks are finalized.

There are a number of different items that are stored in the StateDB including Accounts,
the Contract binary, the Channel Config, and general Contract State.

### Contract State

The Contract itself is stored in state along with its version number. The
Contract Object fields are defined below. When a Contract is deployed to the
channel it no only updates the Virtual Machine to use the new binary, but it also
updates state. This is useful as a way to know that nodes have the exact same
copy of the contract, because if a different contract was stored in a node's state
it would have a different state root value. See the [Contract Object](#Contract-Object)
above for more information on the fields within the Contract Object.
