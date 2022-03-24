# Mazzaroth Studio

[Mazzaroth Studio](https://studio.mazzaroth.io/) is an online
IDE (Integrated Development Environment) that helps teach
how to write Mazzaroth Smart contracts.
It provides tools to compile the contract into a WebAssembly (WASM)
binary, deploy to a Mazzaroth Node, and submit transactions
to call functions on a deployed contract.

## Quick Start

To get started visit [Mazzaroth Studio](https://studio.mazzaroth.io/) and
sign in with one of the supported providers (GitHub, GitLab, or Google).
Select one of the templates (Hello World, New Contract, or Simple Token) to
create the initial project files. Click `Build` to compile the contract into
a contract.wasm WebAssembly binary and generate the abi.json.

In order to use the `Deploy` and `Run` features you must be running a Mazzaroth
Node locally or have the address of a node that you can interact with.

With Docker you can start a Mazzaroth Standalone Node for testing. Use the following
command to start a Standalone node with port 6299 open for HTTP Access.

```Bash
docker run -p 6299:6299 kochavalabs/mazzaroth:latest node start standalone
```

With a Node running you may use the `Deploy` button to send a Contract Update Transaction
that contains the compiled contract.wasm binary. Make sure that the Node Address
field is set to the location of the running Mazzaroth Node. You may leave the
other fields at default values for testing.

After doing a `Deploy` you can use the `Run` button to send a Call Transaction to
execute a function on the Node with the deployed contract. This dialog will let
you select the function to call based on the abi.json from the compiled contract.
Simply select a function and enter values for the arguments then press Run. The
output of the function call should appear in the bottom right corner.

## Key Features

### Rust Template Contracts

Mazzaroth Studio provides three basic templates to start projects from:
[Hello World](#Hello-World), [New Contract](#New-Contract), and [Simple Token](#Simple-Token).

#### Hello World

The Hello World contract is a smart contract template demonstrating a few basic
features of Mazzaroth smart contracts. This is a good contract to start with to
get an idea of what a minimal smart contract looks like while still providing some
functionality. The contract has one readonly function which takes a string and
returns a string. The function `hello` logs a message to the Mazzaroth Node
and outputs Hello World as a return from the function.

#### New Contract

New Contract is a smart contract template that provides a minimal set of required
functions. This template is useful if you want to create your own contract and
don't need to see other examples. It provides the main function needed to
execute on the Mazzaroth Virtual Machine and a couple empty functions.

#### Simple Token

The Simple Token Contract is an example token implementation that includes functions
showing how tokens can be transferred between addresses.
This is similar to what you would find in EOS and Ethereum.
This is a good contract to check out some of the more advanced features necessary
to write a useful Mazzaroth Contract. When deployed you can use this contract to
initialize a balance of tokens to an address and freely transfer tokens between
addresses as well as check the token balance or total supply at any time.

This template is meant for testing purposes only. It is missing some important features
that would be needed for a real token contract, such as not allowing multiple initializations
or only allowing account holders to transfer from their own account.

### Building the Contract

The Build function currently works by sending the source files to a backend server
which does a Cargo build to produce the contract.wasm binary and abi.json file.
The benefit of this is that contracts can be built by new users without a Rust
toolchain.

For those more familiar with Rust you can do the same thing by downloading
the source files, adding a Cargo.toml, and running a Cargo build targeting
wasm32-unknown-unknown. The three Mazzaroth Rust libraries that are used to
help compile Rust contracts are available on Crates.io:

[mazzaroth-xdr](https://crates.io/crates/mazzaroth-xdr) - Contains the XDR objects
used by Mazzaroth.  
[mazzaroth-rs](https://crates.io/crates/mazzaroth-rs) - Includes host bindings needed
to compile for Mazzaroth VM and provides many useful functions for contracts.  
[mazzaroth-rs-derive](https://crates.io/crates/mazzaroth-rs-derive) - Provides the
macros to derive the mazzaroth contract abi for a contract.

### Downloadable Files

The Download button will download a zip of all of the files in the project
directory on the left. This can be used to download the source files for a
particular template as well as the target files that are created by doing a
build. You can also right click on any file to download a copy of just that
particular file.
