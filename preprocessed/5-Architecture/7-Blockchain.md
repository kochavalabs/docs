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
`/transaction/submit` RPC API endpoint.

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

A user can use the `/transaction/lookup` API with the Transaction ID to check if
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

!INCLUDE "definitions/Block.md", 3

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

!INCLUDE "definitions/Transaction.md", 3

#### Authentication

Signing is used throughout the system to ensure three properties about a message:
integrity, authentication, non-repudiation. In short, a cryptographic signing
algorithm can give you guarantees that a message is from a particular person
and has not been tampered with.

Although we used signing in multiple places, a practical example of this is
with the signing of transactions. Every user of the Mazzaroth system will need
to generate a cryptographic key pair to identify themselves to the system.
The public key for this pair will be their account ID. Transactions submitted
to the Mazzaroth system must be signed by the sender using their account key pair.

Since the private key is used to prove your identity for authentication
it is very important to keep this key safe.

Authentication comes from the signature on a transaction. The action data on a
transaction must be signed by the private key or a [permissioned](#Permissioning)
key for the sender of the transactions.

#### Contract

Transactions may also be used to update the Contract state of a channel. A
channel can only have one contract that defines the functions available. The
contract is set by the owner through a Contract Update Transaction. See the
[Update Object](#Update-Object) above for an example of how this field can be
set on a transaction.

Example Contract Update Transaction JSON:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 1,
                    "value": {
                        "contractBytes": "contract bytes",
                        "contractHash": "0000000000000000000000000000000000000000000000000000000000000000",
                        "version": "1.0.0"
                    }
                }
            }
        }
    }
}
```

#### Permissioning

There are some instances when you may want a third party to act on your behalf
without giving out your private key. To allow this Mazzaroth includes a
permissioning feature that allows special transactions to Grant and Revoke
access to addresses to sign transactions on a user's behalf.

Once an address has been granted permission for another address it is added
to the `permissioned_keys` account object in state for a channel.

To grant an address access to sign transactions you must submit a
[Permission](#Permission-Object) type Transaction with the `GRANT` Permission action.
Access can be revoked for an address by submitting a
[Permission](#Permission-Object) type Transaction with the `REVOKE` Permission action.

Example Permission Update Transaction JSON:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 3,
                    "value": {
                        "key": "0000000000000000000000000000000000000000000000000000000000000001",
                        "action": 1
                    }
                }
            }
        }
    }
}
```

#### Account

See XDR definition [here](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/account.x).

Users of Mazzaroth are identified by their public key. This key ties to an
[Account Object](#Account-Object) in the channel. Every Transaction that
is sent to the blockchain must contain a public key in the `address` field of the
[Action Object](#Action-Object), which identifies the account that is sending the
transaction. It is possible that a different key is used to sign the transaction
using the [Permissioning](#Permissioning) feature, but the address is still used
to identify the sender of a transaction.

!INCLUDE "definitions/Account.md", 3

### Receipts

See XDR definition [here](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/receipt.x).

Receipts are the stored results from the execution of a transaction.
Receipts for every transaction that is accepted by Consensus are stored, along
with the transaction itself, in the ledger. Receipts may be looked up by the
Transaction ID use the Mazzaroth RPC API on a Readonly node.

!INCLUDE "definitions/Receipt.md", 3

## State Database

The Mazzaroth Virtual Machine (RothVM) contains a State Database that stores all
of the data necessary for the channel. The Database is used to store and access
objects for a channel and is backed by a Merkle Tree. The State DB may get updated
as a result of Transaction execution, such as by updating the Contract store in state
or by executing a contract function that stores a value. The Merkle root of the
State DB is stored in block headers when blocks are finalized.

There are a number of different items that are stored in the StateDB including Accounts,
the Contract binary, the Channel Config, and general Contract State.

### Account State

The accounts that submit transactions to a channel will be stored in the State DB.
See [Account](#Account) above for more information on what an Account is in Mazzaroth.
Accounts are stored by the Public Key used to submit transactions. So accounts
may be looked up by anyone that knows the public key, but it only provides the
information stored in the account object. This is useful for things like looking
up the account nonce for an ID. Every transaction, unless it is Readonly,
that gets executed will, at the very least, update the account nonce of the sender.
This means that the state root will always change after a successful execution,
even if the contract function called does not affect state.

### Contract State

The Contract itself is stored in state along with its version number. The
Contract Object fields are defined below. When a Contract is deployed to the
channel it no only updates the Virtual Machine to use the new binary, but it also
updates state. This is useful as a way to know that nodes have the exact same
copy of the contract, because if a different contract was stored in a node's state
it would have a different state root value. See the [Contract Object](#Contract-Object)
above for more information on the fields within the Contract Object.

### Channel Config State

The Channel Config object that is used to define a channel is stored in state.
A transaction from the owner, or admins, of the channel is required to update
the channel config. See [Channel Config Object](#Channel-Config-Object) above
for more information on the fields within the Channel Config Object.
