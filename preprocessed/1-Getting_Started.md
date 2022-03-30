---
sidebar_label: "Getting Started"
sidebar_position: 1
---

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
mazzaroth start standalone --cfg-path my-config.yaml
```

For the GCP standalone solution a systemd service is already setup and all that
needs to be updated is the `/opt/mazzaroth-config.yaml` followed by a service
restart: `sudo systemctl restart mazzaroth.service`

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

[m8](https://github.com/kochavalabs/m8) is a command line tool
to allow users to easily interact with Mazzaroth nodes.

### Deploy a Contract

If you are running a Standalone node or are setting up a new channel the first
thing you will need to do is deploy your contract. If you have not already
written and compiled a contract to deploy first read the section on
[Writing a Smart Contract](#Writing-a-Smart-Contract).

Using m8, the command to deploy a contract is:

```Bash
m8 channel exec deployment --deployment-manifest deployment.yaml
```

Where `deployment.yaml` is the path to a file containing the deployment
configuration for the contract. An example deployment.yaml can be found
[here](https://github.com/kochavalabs/m8/blob/develop/examples/deployment.yaml).
