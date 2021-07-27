# Storage

Data is stored by Mazzaroth in a couple of ways. The Mazzaroth Ledger
keeps a persistent copy of blocks and transactions that are accepted into
the blockchain. The Mazzaroth Virtual Machine (RothVM) also contains a
State Database that tracks metadata about a channel and is used for contract
storage.

## Key Value Store

The underlying data storage for the state databases in Mazzaroth is a
Key-Value store. This includes the Ledger DB, which stores all blocks
and transactions on the blockchain and the RothVM StateDB, which includes state
data for the channel and contract.

Using a Key-Value Stores give a lot of flexibility as any object can be stored
as the value to a key. For example, we use a Key-Value Store to contain the data
of a [Merkle Tree](#Merkle-Tree) that represents all of the state data in the
RothVM making it easier to authenticate. We can also use the Key-Value Store
to store data for access using [SQL Dialect](#SQL-Dialect) which is a very useful
feature that can be provided to contracts storing data on Mazzaroth.

The following interface defines how the Mazzaroth KVStore can be used:

```Golang
type KeyValue struct {
    Key   []byte
    Value []byte
}

type Store interface {
    Delete(key []byte) error
    Get(key []byte) ([]byte, error)
    Set(key []byte, value []byte) error

    // Scan Scans across a key range from start (inclusive) to end (exclusive)
    // in descending order ( 'a' -> 'b' -> 'c' )
    // sending any results down the returned channel.
    Scan(start []byte, end []byte) chan KeyValue

    // ReverseScan Scans across a key range from start (inclusive) to end
    // (exclusive) in ascending order ( 'c' -> 'b' -> 'a' ) sending any results
    // down the returned channel.
    ReverseScan(start []byte, end []byte) chan KeyValue

    // NextSequence returns a monotonically increasing integer.
    // Multiple sequences can be created by providing different keys.
    // New Sequences start at 0
    NextSequence(key []byte) (uint64, error)

    Close() error
}
```

Mazzaroth currently uses [Badger](https://github.com/dgraph-io/badger) as its
underlying Persistent KVStore.

## Merkle Tree

A Merkle Tree is a tree in which every every leaf node may be represented by a
cryptographic hash and every non-leaf is labelled with the cryptographic hash
of its child nodes. The benefit of using a Merkle Tree is that it provides
efficient and secure verification of the data that it stores.

For an example of how this is used in Mazzaroth take a look at the fields of a
Block Header.

!INCLUDE "definitions/BlockHeader.md", 2

Every Block Header contains three Merkle Root Hashes, which correspond to the
Transaction Merkle Tree, the Receipt Merkle Tree, and the State DB Merkle Tree.

Mazzaroth has two implementations of Merkle Trie's, a Sparse and Radix type with
Radix being the default option as it is a space-optimized implementation.

The Mazzaroth MerkleTrie interface embeds the KVStore with additional functionality
for getting Merkle Roots and paths:

```Golang
type Trie interface {
    kvstore.Store

    // Get a key, if it exists return the value and path for
    GetPath(k []byte) ([]byte, *Path, error)
    // GetRoot of the trie
    GetRoot() ([]byte, error)
    // SetRoot of the trie
    SetRoot([]byte) error
}

type MerkleTrie struct {
    trie Trie
}
```

## RothVM StateDB

The Mazzaroth Virtual Machine (RothVM) contains a State Database which stores
metadata for a channel as well as the state data for a smart contract deployed
to the channel.

### RothVM StateDB Prefixes

Key collisions are prevented by using a reserved set of prefixes and unique keys
for data within the State Database.

#### Account Prefix

The Account prefix is `[]byte("a_")` and is used to prefix all account keys stored
in the StateDB.

For example, the account for address `3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29`
would be stored at the key by combining the account prefix with the previous byte
ID. See Account object definition below.

!INCLUDE "definitions/Account.md", 4

#### Channel Config Key

The Channel Config key is `[]byte("c_")` and is used to store the Channel Config
object.  See Channel Config object definition below.

!INCLUDE "definitions/ChannelConfig.md", 4

#### Contract Key

The Contract Key is `[]byte("d_")` and is used to store the Contract as bytes.

#### State Prefix

The State Prefix is `[]byte("s_")` and is used to prefix all keys used by the contract's
internal storage.

For example, if a contract uses the host `Set` external function it will store a
value in the RothVM StateDB by combining the State Prefix with the given key.
See [WebAssembly doc](https://mazzaroth.io/docs/5-Architecture/4-WebAssembly.md)/
for info about the System interface function.

### SQL Dialect

Since the State Database is just a Key-Value store it is very simple for a contract
to access data by storing and retrieving using keys. This however, does have some
limitations. For contracts that store a lot of objects if they want to retrieve
objects that contain a particular field they would have to perform many separate
retrieve calls and manually check the objects to filter. This is a very inefficient
way to access data and would result in very long running function calls in contracts
that do this type of operation.

To improve this we have added an SQL driver built on top of the Key-Value Store data
within the RothVM State Database. The data can be inserted and queried using traditional
SQL Dialect directly from the contract. This is currently done by implementing the
[Genji Engine](https://github.com/genjidb/genji/blob/v0.10.0/engine/engine.go) interface
on top of the RothVM State Database.

The RothVM System Interface provides functions to execute and insert into the State
Database. See the [WebAssembly](https://mazzaroth.io/docs/5-Architecture/4-WebAssembly.md)
documentation for a full list of the System Interface functions. These can be used
within contracts by importing the Mazzaroth library. An example of
function calls using Rust with the [mazzaroth-rs](https://github.com/kochavalabs/mazzaroth-rs)
library are provided below.

```Rust
// The mazzaroth_rs external sql module provides the System Interface functions.
use mazzaroth_rs::external::sql;

// Use exec to execute a CREATE TABLE statement
match sql::exec("CREATE TABLE foo;") {
    Some(_) => panic!("Error creating table"),
    None => {}
};

// Use insert to add an object to a specified table
sql::insert("foo".to_string(), "{'id': 'bar'}").unwrap();

// Use exec to query data from a table
sql::exec("SELECT * FROM foo WHERE id = 'bar'")
```

## Ledger Database

The Mazzaroth Ledger is a Database which stores ledger information including
transactions, receipts, and blocks that have been processed by a Mazzaroth network.
Transactions and receipts are committed to the ledger, which can be finalized with
multiple transactions into a block.

The Ledger also includes functions that allow retrieving data or getting information
about the existing state of the ledger.

The following interface defines the current functionality of the ledger:

```Golang
type Ledger interface {
    Commit(tx xdr.Transaction, receipt xdr.Receipt) (xdr.Hash, error)

    // Get a transaction by its id
    GetTransaction(transactionID []byte) (xdr.Transaction, error)

    // Gets the latest committed transaction
    GetLatestTransaction() (xdr.Transaction, error)

    // Get transactions committed, but not yet finalized to a block
    GetPendingTransactions() []xdr.Transaction

    // HasPendingTransactions whether there are pending transactions in the ledger
    HasPendingTransactions() bool

    // Get a Transaction Receipt by transaction id
    GetReceipt(transactionID []byte) (xdr.Receipt, error)

    // GetBlock returns a block by hash id
    GetBlock(id []byte) (xdr.Block, error)
    // GetBlockByHeight returns a block by idx ( id is the integer index a.k.a the block height)
    GetBlockByHeight(idx uint64) (xdr.Block, error)
    // GetBlockHeaderByHeight returns the block header by the block height
    GetBlockHeaderByHeight(idx uint64) (xdr.BlockHeader, error)
    // GetBlockHeader returns the block header for the given header hash
    GetBlockHeader(id []byte) (xdr.BlockHeader, error)
    // FinalizeBlock will commit the current block as final and start a new block, returning the blockId and block height
    FinalizeBlock(consensusSeqNumber uint64) (*xdr.Block, error)

    // RevertToBlock will remove all pending transactions and blocks to return to the specified stable block
    RevertToBlock(height uint64) error

    // GetLedgerID returns a ID of a ledger - For now this will be the hash of the genesis block
    GetLedgerID() string
    // VerifyLedger will walk through the chain and verify that the local DB is not corrupted (VERY LONG RUNNING)
    VerifyLedger() error
    // Close connections
    Close() error

    // Get the current block height
    CurrentBlockHeight() uint64

    // Get current ledger state
    GetCurrentLedgerState() xdr.StateStatus

    IsEmpty() bool
}
```

### Ledger Prefixes

Key collisions are prevented by using a reserved set of prefixes and unique keys
for data within the State Database.

#### Transaction Prefix

The Transaction prefix is `[]byte("t")` and is used to prefix block height and
transaction count with the transaction ids to the transaction object in the store.

For example, a transaction with id "aaa" as the second transaction in block 1
would be stored with the following prefixes applied:
`[]byte("t") + [8]byte(1) + [8]byte(2) + []byte("aaa")`

Note: The block height and transaction height are encoded as Big Endian uint64s
and the transaction id is a Sha3_256 hash of the transaction object, not shown in
the example for simplicity.

The benefit of prefixing with block height in this order is that it is possible
to find all transactions for a block by scanning over the keys with just the
Transaction prefix and block number.

#### Transaction Block Lookup Prefix

The Transaction Block Lookup prefix is `[]byte("x")` and is used to prefix
transaction ids to the block height in the store. To get a transaction from
the ledger this prefix is used to lookup the block height to be used to get
the block object which contains the transaction.

#### Header Number Prefix

The Header Number prefix is `[]byte("n")` and is used to prefix block header
hash to the block height. This can be used to lookup a block by its header
id.

#### Header Store Prefix

The Header Store prefix is `[]byte("h")` and is used to prefix block height
to the block header object. Block height is a Big Endian encoded uint64.

#### Receipt Hash Prefix

The Receipt Hash prefix is `[]byte("r")` and is used to prefix transaction id
to the receipt hash id.  This can be used to lookup a receipt by transaction id.

#### Receipt Prefix

The Receipt prefix is `[]byte("p")` and is used to prefix receipt
hash to the receipt object.
