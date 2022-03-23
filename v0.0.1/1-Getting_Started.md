# Mazzaroth

## Introduction

Mazzaroth is a distributed ledger platform that allows people to write and
deploy decentralized smart contracts. The ecosystem is made up of a network
of various nodes tied to channels that take part in a consensus process as
well as provide a service to clients to submit transactions and retrieve
information from the ledger.

## Writing a Smart Contract

A Mazzaroth Smart Contract is a WebAssembly binary that defines the functions
that may be called by transactions submitted to the channel and how data is
stored in state for that channel. There are many different ways to write code
that can be compiled to WebAssembly. The requirement for it to be considered
a Mazzaroth Smart Contract is that it includes a main function and handles the
input object correctly.

We currently support Mazzaroth Smart Contracts written in
[Rust](https://github.com/rust-lang/rust) by leveraging the
[mazzaroth-rs](https://github.com/kochavalabs/mazzaroth-rs) library
with support for more languages on the horizon.

You can easily get started by using
[Mazzaroth Studio](https://studio.mazzaroth.io/), the online IDE.
It allows you to start a new project from a template and then build and
download the compiled WASM module that can be
[deployed](#Interacting-with-a-Node) as a Smart Contract.

After selecting a template, such as "Hello World", clicking the Build button
will compile the contract to a binary `wasm` file and provide an abi.json
for your contract.

The Download button can be used to download all working files, including the
built files in the target directory.

## Running a Node

A Mazzaroth Node is the application that performs one or more of the many
roles required by the Mazzaroth ecosystem.

To run one or more Mazzaroth Nodes you must have access to the Mazzaroth
binary, which is bundled with the GCP solution.

There are currently 3 types of nodes available to be deployed:

- [Standalone](#Standalone) nodes are useful for development, but do not connect
to the distributed network of consensus nodes.
- [Readonly](#Readonly) nodes provide users with access to the blockchain
through RPCs but do not participate in consensus.
- [Consensus](#Consensus) nodes participate in a channel's consensus to
facilitate ordering and execution of transactions.

The command to start a node is `mazzaroth start` followed by the type.
Command line flags may also be provided to override default config values or
you can use a config yaml file. For example, to start a standalone node with
a config file you can use the following command:

```Bash
mazzaroth start standalone --config my-config.yaml
```

For the GCP standalone solution a systemd service is already setup and all that
needs to be updated is the `/opt/mazzaroth-config.yaml` followed by a service
restart: `sudo systemctl restart mazzaroth.service`

### Node Config

The following table lists the configurable values for a Mazzaroth node and
their default values.

| Name | Default | Description |
|---|---|---|
| node_id | 0x3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29 | The public key of the account running this node. For standalone nodes this will also be the channel owner. |
| channel_id | 0x0000000000000000000000000000000000000000000000000000000000000000 | The channel ID this node is assigned to. Used to choose which channel a node will join. Nodes will reject transactions with a different channel ID. |
| data_dir | data | The directory to store persistent DB data. |
| block_size | 0 | Max number of transactions to store in a block. When set to 0 no limit is applied to block size. |
| ct_max_size | 500000000 | The maximum number of bytes in the body of an HTTP request. Must be large enough to support compiled contract updates. |
| http_port | 8081 | The port used to listen for HTTP requests. |
| check_nonce | true | Make sure that the account nonce is validated on transactions. In most cases this should not be changed. |
| recover_panic | true | Allow the VM to recover from panics. This is expected behavior to recover from errors during execution and should only be turned off for debugging purposes. |
| debug | false | Enable debug logging on a node. |

### Standalone

A standalone node can be used as a development environment for Mazzaroth.
It provides a way to deploy and interact with a smart contract without
connecting to the global network of nodes.

### Readonly

A readonly node is connected to the network but does not participate in consensus.
The main role of a readonly node is to allow clients to send requests to the
channel including submitting transactions and requesting information from
the ledger or state.

### Consensus

A consensus node is connected to the network and participates in the consensus
that accepts transactions into the channel. A consensus node does not allow
requests from clients, but does receive forwarded transactions from other
readonly nodes in the network.

## Interacting with a Node

This guide will walk you through interacting with a Mazzaroth node.
Standalone and Readonly nodes use HTTP to handle requests and can be used to
deploy contracts, submit transactions, or lookup information from the ledger.

[Mazzaroth-CLI](https://www.npmjs.com/package/mazzaroth-cli) is a JavaScript
library with a command-line interface to allow users to easily interact with
 Mazzaroth nodes.

### Deploy a Contract

If you are running a Standalone node or are setting up a new channel the first
thing you will need to do is deploy your contract. If you have not already
written and compiled a contract to deploy first read the section on
[Writing a Smart Contract](#Writing-a-Smart-Contract).

Using Mazzaroth-cli, the command to deploy a contract is:

```Bash
mazzaroth-cli contract-update [options] <val>
```

Where `<val>` is the path to a file containing the wasm bytes. You will also
need to provide `[options]` including the host (`-h`) where the node is
listening, your private key (`-k`) to allow
[Mazzaroth-CLI](https://www.npmjs.com/package/mazzaroth-cli) to sign your
transaction, and your account nonce (`-n`).

Account nonces are used as a way to prevent duplicate transactions.
Transactions must have a nonce that matches the expected nonce of the account
in state. Every new account starts with a nonce of 0 and every accepted
transaction increments this value by 1. If you do not know the nonce of your
account you can request it from the node by running a
[Mazzaroth-CLI](https://www.npmjs.com/package/mazzaroth-cli) command with your
public key.

Example:

```Bash
mazzaroth-cli nonce-lookup 3a547668e859fb7b112a1e2dd7efcb739176ab8cfd1d9f224847fce362ebd99c
```

An example using the config default values and running
[Mazzaroth-CLI](https://www.npmjs.com/package/mazzaroth-cli) from the local machine:

```Bash
mazzaroth-cli contract-update -h http://localhost:8081 -k 00000000000000000000000000000000000000000000000000000000000000 -n 0 hello_world.wasm
```

### Interactive Contract CLI

The easiest way to build and send transactions from the
[Mazzaroth-CLI](https://www.npmjs.com/package/mazzaroth-cli) is to use the
 contract-cli command. This requires a copy of the ABI JSON that is generated
when compiling contracts using the mazzaroth-rs rust library. The same options
are available for setting the private key for signing and the host, but the
nonce is set for you with each transaction.

Example:

```Bash
mazzaroth-cli contract-cli -h http://localhost:8081 -k 00000000000000000000000000000000000000000000000000000000000000 abi.json
```

Once the interactive CLI is started use the command line to specify
functions and parameters.

Use the command `abi` to print out a list of available functions.
Then use the function name with parenthesis and parameters separated
by commas to call the function.