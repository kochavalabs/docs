# Data Structures

Mazzaroth uses various data structures to organize and store information.
Some of these are described below.

## Channels

Mazzaroth uses channels to separate networks that are running Mazzaroth nodes.
When setting up a network in Mazzaroth you must use a unique id to identify
which channel your nodes or transactions belong to.

Each channel will have its own state, ledger, and set of nodes that are participating.
When a transaction is created it must specify the channel ID to ensure it is executed
in the correct channel. This also prevents replay attacks by not allowing transactions
to be played on multiple channels with the same data.

It is possible to start a private cluster of nodes to create a private channel
by starting all nodes with the same channel ID. More support for channels including
cross-channel communication and channel registration is currently under development.

## Consensus

Mazzaroth uses a version of Practical Byzantine Fault Tolerance (PBFT) consensus
for transaction ordering. This is a leader based ordering system which protects
against faulty nodes while allowing a distributed network to reach consensus.

- [PBFT White Paper](http://pmg.csail.mit.edu/papers/osdi99.pdf)

Nodes may join a channel as a Consensus node in order to participate in the
consensus protocol. Gateway nodes in a channel will take incoming transactions
from clients and submit them to a consensus node to have the transaction ordered
and executed. The consensus may batch a number of transactions in a single
request round to reduce the number of consensus messages that are needed to
finalize transactions. Once a round of consensus has completed for a batch of
transactions they can safely be executed and added to the ledger.
The participating consensus nodes will sign and notify other nodes in the network
that the transactions should be added.

## Node Types

A Mazzaroth Node is the application that performs one or more of the many roles
required by the Mazzaroth ecosystem.

There are currently 3 types of nodes:

- [Standalone](#Standalone-Node) nodes are useful for development, but do not connect
to the distributed network of consensus nodes.
- [Gateway](#Geadonly-Node) nodes provide users with access to the blockchain through
RPCs but do not participate in consensus.
- [Consensus](#Consensus-Node) nodes participate in a channel's consensus to facilitate
ordering and execution of transactions.

### Standalone Node

A standalone node can be used as a development environment for Mazzaroth.
It provides a way to deploy and interact with a smart contract without
needing a network of nodes.

### Gateway Node

A gateway node is connected to the network but does not participate in consensus.
The main role of a gateway node is to allow clients to send requests to the channel
including submitting transactions and requesting information from the ledger or state.

### Consensus Node

A consensus node is connected to the network and participates in
the consensus that accepts transactions into the channel.
A consensus node does not allow requests from clients,
but does receive forwarded transactions from other gateway nodes in the network.

## Peer to Peer

Nodes within Mazzaroth communicate with each other
through a multi-layered peer-to-peer network.
Nodes can join a global membership network that uses multiple channel ids and
node roles to run separate channels.
It is also possible to start a private cluster of nodes using
a single channel id with the same supported peer-to-peer network.

### Membership

For keeping track of membership, Mazzaroth uses a version of the
SWIM (Scalable Weakly-consistent Infection-style Process Group Membership) Protocol.
Nodes can connect to the network with a role and their membership is propagated
throughout the network. A node simply needs to connect to an existing member
of the network in order to join.

### Distributed Ledger

Each type of node (gateway or consensus) will keep a record of transactions
that have been executed along with receipts in its Ledger.
Consensus and Gateway nodes communicate to each other using a p2p protocol
backed by the membership to make sure transactions are propagated to all nodes
in the network. With Consensus ordering we ensure that the ledger of each node
participating in the network will match for a given height.

## Merkle Tree

A Merkle Tree is a cryptographic data structure used to store data which can be
efficiently verified across different peers. Merkle Trees are used to store
ledger data such as transactions and receipts and Contract State data. The
Merkle Root hashes of all of these trees are stored in the Block Headers within
the ledger. The Merkle Root hashes can be used to verify that contents are identical
to a peer.
