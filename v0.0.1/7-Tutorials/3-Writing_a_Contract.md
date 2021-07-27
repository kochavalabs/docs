# Writing a Contract

We currently support Mazzaroth Smart Contracts written in
[Rust](https://www.rust-lang.org/) by leveraging the
[mazzaroth-rs](https://github.com/kochavalabs/mazzaroth-rs) library
with support for more languages on the horizon.

## Mazzaroth Studio

You can easily get started and see some examples by using
[Mazzaroth Studio](https://studio.mazzaroth.io/), the online IDE.
It allows you to start a new project from a template and then
build and download the compiled WASM module that can be
deployed as a Smart Contract. After selecting a template,
such as "Hello World", clicking the Build button will compile the contract to a
binary `wasm` file and provide an abi.json for your contract.
The Download button can be used to download all working files,
including the built files in the target directory.

## Rust Project

With a basic understanding of [Rust](https://www.rust-lang.org/) it is possible
to write an application that can be compiled into a Mazzaroth Smart Contract.
You will just need to include the [mazzaroth-rs](https://github.com/kochavalabs/mazzaroth-rs),
which is made available on [crates.io](https://crates.io/crates/mazzaroth-rs).

You must also install the wasm32-unknown-unknown target to your Rust Toolchain,
which can be done with the following command:

```Bash
rustup target add wasm32-unknown-unknown
```

For a more in-depth example of how to write, test, and deploy a contract from
a Rust Project check out the [Full Contract Example](https://github.com/kochavalabs/full-contract-example)
repository.
