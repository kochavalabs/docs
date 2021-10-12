# Mazzaroth-it

[![CircleCI](https://circleci.com/gh/kochavalabs/mazzaroth-it.svg?style=svg)](https://circleci.com/gh/kochavalabs/mazzaroth-it)

Although some of a contract's logic can be tested using standard rust unit tests,
integration tests are necessary for testing host functions and other higher
level logic. Mazzaroth-it is a relatively straight forward node script that
helps by automating some of the repetitive tasks related with running
integration tests.

## Introduction

Mazzaroth-it allows you to specify a series of test sets that can be run on a
freshly spun up standalone node. For each test set mazzaroth-it will handle
starting the node, initializing the network configuration and running the
initial contract deploy. Next it will send a series of transactions based upon
what you configure and allow you to assert what the results should be. In order
to run mazzaroth-it you will need to have the latest version of docker
installed, the standalone node will be run in a docker instance.

## Sample

The configuration used to run mazzaroth-it is a simple json file:
(Note that paths are relative to where mazzaroth-it is being run, not the
config)

```json
{
    "warmup-ms": 2000,
    "deploy-ms": 1000,
    "abi": {
        "type": "file",
        "value": "./contract-abi.json"
    },
    "channel-id": "",
    "contract": "./contract.wasm",
    "node-addr": "",
    "owner": "",
    "test-sets": {
        "first-test-set": [
            {
                "args": [],
                "function_name": "setup",
                "result": true,
                "sender": ""
            },
            {
                "args": ["arg_1", "arg_2"],
                "function_name": "my_func",
                "sender": "",
                "result": "Hello World!"
            }
        ]
    },
    "xdr-types": "./types.js"
}
```

| Config | Description |
| ------- | ----------- |
| warmup-ms | Time to wait in ms after starting the docker standalone node to make sure it is ready to accept requests. Default: 1000|
| deploy-ms | Time to wait in ms between sending config and deploy transactions. Default: 300 |
| abi | Contract abi.json. Can be of type file (specify a json file) or config where you put the raw abi in the config value |
| channel-id | The channel ID as 64 character hex string. Default: "0".repeat(64) |
| contract | Path to the contract wasm file. |
| node-addr | Web address for the mazzaroth node. Default: localhost:8081 |
| owner | Name of the owner to use for the config and contract update transactions. Default: "0".repeat(64) |
| test-sets | A series of named test sets to be run, each test set starts with a fresh mazzaroth node with no state and runs the specified transactions. |
| test-set.args | Arguments to be sent to the function. Translated directly to transaction parameters |
| test-set.function_name | Name of the contract function to call. |
| test-set.sender | Account to send the transaction as, 64 character hex string. Default: "0".repeat(64) |
| test-set.result | Expected result from the function call, will be asserted and fail if not equal. |
| xdr-types | Path to the XDR type js file if any custom types are being used. |

When your configuration is setup you can then run mazzaroth-it test:

```Bash
ls tests
# basic-tests.json   advanced-tests.json

# You can give a specific configuration
mazzaroth-it test --config tests/basic-tests.json

# Or you can give a directory and mazzaroth-it will run all the configs under
# the directory.
mazzaroth-it test --config tests/
```
