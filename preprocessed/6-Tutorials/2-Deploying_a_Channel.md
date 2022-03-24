# Deploying a Channel

The first step to publish a smart contract to Mazzaroth is
to deploy a channel. Even if you are working from a standalone
node it is necessary to set up the Channel prior to
deploying a Contract.

There are a few steps to take depending on your end goal. If you are
looking to deploy a channel to the public Mazzaroth network it must
be [registered](#Registering-the-Channel) on the Mazzaroth channel.
If you want to set up your own private network or work directly off
of a standalone node you can skip the registration step and just use
a custom channel id.

## Registering the Channel

The process for registering a channel on the public Mazzaroth network is
still a work in progress. More info on how to do this will be provided
once the network has been officially released.

## Deploy Nodes

To deploy a channel you must run Mazzaroth nodes that can process transactions.
This can be done with a [consensus network](#Consensus-Network)
or a single [standalone](#Standalone-Node) node.

### Consensus Network

To run a consensus network you will need at least four Consensus Nodes
and a single Readonly node configured to connect to each other.

Currently, these node types have not been released for public use.
Documentation will be updated when these are made available.

### Standalone Node

To run a standalone node you can use the Mazzaroth docker image.
The command to run a standalone node with mounted data directory
and exposed http port 6299 is provided below.

```Bash
docker run -p 6299:6299 --mount type=bind,src=/data,dst=/data kochavalabs/mazzaroth:latest node start standalone
```

Things to note if using the default config values are that the standalone node will
be using the default channel ID of "0000000000000000000000000000000000000000000000000000000000000000".

If you would like to use a different channel id this
can be provided as command line arguments to the start standalone command.

Example:

```Bash
docker run -p 6299:6299 --mount type=bind,src=/data,dst=/data kochavalabs/mazzaroth:latest start standalone --channel_id 0000000000000000000000000000000000000000000000000000000000000000
```

## Upload a Contract

Once you have a Readonly or Standalone node running you may upload
a contract to the channel by submitting a Deploy type Transaction.

This transaction includes the WebAssembly contract bytes and ABI and initializes
the Mazzaroth Virtual Machine (RothVM) for the nodes running the channel.

The JSON for a Deploy Transaction looks like this:

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

For more info about how to write and deploy a contract check out the
[Writing a Contract](https://mazzaroth.io/docs/6-Tutorials/3-Writing_a_Contract.md)
tutorial.

## Mazzaroth Command Line Tool: m8

To help with deploying a contract, [m8](https://github.com/kochavalabs/mazzaroth-cli)
includes a deploy command.

Example:

```Bash
m8 channel exec deployment --deployment-manifest deploy.yaml
```

This command takes a YAML config file which should include the fields of the
channel configuration, the abi file, the contract wasm binary, and optional initial
transactions to execute on the contract. The config fields are described below.

| Config | Description |
| ------- | ----------- |
| channel.abi-file | Contract abi.json location. |
| channel.id | The channel ID as 64 character hex string. |
| channel.name | The channel name as a readable string. |
| channel.version | The contract version to set in the contract deploy. |
| channel.contract-file | Path to the contract wasm file. |
| channel.address | Web address for the mazzaroth node. |
| channel.owner | ID of the owner of the contract. |
| channel.transactions | A series of named initial transactions to execute after deploy. |
| channel.transactions.tx.args | Arguments to be sent to the function. Translated directly to transaction parameters |
| channel.transactions.tx.function | Name of the contract function to call. |

Example deploy.json:

```YAML
version: 0.0.1
type: deployment
channel:
  version: 0.0.1
  id: 0000000000000000000000000000000000000000000000000000000000000000
  owner: 3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29
  contract-file: "./contract/target/wasm32-unknown-unknown/release/contract.wasm"
  abi-file: "./contract/target/json/ExampleContract.json"
gateway-node:
  address: http://localhost:6299
deploy:
  name: example-contract
  transactions:
    - tx:
        function: "setup"
```
