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
and exposed http port 8081 is provided below.

```Bash
docker run -p 8081:8081 --mount type=bind,src=/data,dst=/data kochavalabs/mazzaroth:latest start standalone
```

Things to note if using the default config values are that the standalone node will
be using the default channel ID of "0x0000000000000000000000000000000000000000000000000000000000000000"
and the default channel_owner ID of "0x3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29".
The channel_owner ID is the public key that matches the private key of "0x0000000000000000000000000000000000000000000000000000000000000000".

If you would like to use your own keys and a different channel id these
can be provided as command line arguments to the start standalone command.

Example:

```Bash
docker run -p 8081:8081 --mount type=bind,src=/data,dst=/data kochavalabs/mazzaroth:latest start standalone --channel_id 0x0000000000000000000000000000000000000000000000000000000000000000 --channel_owner 0x3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29
```

## Configure Nodes

Once you have a Readonly or Standalone node running to target you will
first need to update the channel config.

The Channel Config can be set on a new Node by submitting a
Config type Update Transaction.

The JSON of a Config Update Transaction looks like this:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {
            "enum": 0
        },
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 2,
                    "value": {
                        "owner": "0000000000000000000000000000000000000000000000000000000000000000",
                        "channelName": "string",
                        "admins": []
                    }
                }
            }
        }
    }
}
```

## Upload a Contract

Once the Channel Config has been set you may upload
a contract to the channel by submitting a Contract type Update Transaction.

This transaction includes the WebAssembly contract bytes and initializes the
Mazzaroth Virtual Machine (RothVM) for the nodes running the channel.

The JSON for a Contract Update Transaction looks like this:

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
                        "contractBytes": "base64",
                        "contractHash": "0000000000000000000000000000000000000000000000000000000000000000",
                        "version": "string"
                    }
                }
            }
        }
    }
}
```

For more info about how to write and deploy a contract check out the
[Writing a Contract](https://mazzaroth.io/docs/7-Tutorials/2-Writing_a_Contract.md)
tutorial.

## Mazzaroth CLI

To help combine the processes of deploying the channel config to create a channel
and updating the channel with a contract, [mazzaroth-cli](https://github.com/kochavalabs/mazzaroth-cli)
includes a deploy command.

Example:

```Bash
mazzaroth-cli deploy deploy.json
```

This command takes a JSON config file which should include the fields of the
channel config, the abi file, the contract wasm binary, and optional initial
transactions to execute on the contract. The config fields are described below.

| Config | Description |
| ------- | ----------- |
| abi | Contract abi.json. Can be of type file (specify a json file) or config where you put the raw abi in the config value |
| channel-id | The channel ID as 64 character hex string. Default: "0".repeat(64) |
| channel-name | The channel name as a readable string. Default: "" |
| contract-version | The contract version to set in the contract update. Default: "0.1" |
| contract | Path to the contract wasm file. |
| host | Web address for the mazzaroth node. Default: localhost:8081 |
| owner | ID of the owner to use for the config and contract update transactions. Default: "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29" |
| init-transactions | A series of named initial transactions to execute, each test set starts with a fresh mazzaroth node with no state and runs the specified transactions. |
| init-transactions.args | Arguments to be sent to the function. Translated directly to transaction parameters |
| init-transactions.function_name | Name of the contract function to call. |
| init-transactions.sender | Account to send the transaction as, 64 character hex string. Default: "0".repeat(64) |
| xdr-types | Path to the XDR type js file if any custom types are being used. |

Example deploy.json:

```JSON
{
    "abi": {
        "type": "file",
        "value": "./contract/target/json/ExampleContract.json"
    },
    "channel-id": "0000000000000000000000000000000000000000000000000000000000000000",
    "channel-name": "Example Channel",
    "contract": "./contract/target/wasm32-unknown-unknown/release/contract.wasm",
    "host": "http://localhost:8081",
    "owner": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29",
    "init-transactions": {
        "products-add-get": [
            {
                "args": [],
                "function_name": "setup",
                "sender": ""
            }
        ]
    },
    "xdr-types": "./xdrTypes.js"
}
```
