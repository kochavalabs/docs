# WebAssembly

WebAssembly (abbreviated Wasm) is a binary instruction format
for a stack-based virtual machine.
Mazzaroth uses a custom runtime to execute Wasm binaries of compiled smart contracts.

- [Website](https://webassembly.org/)
- [Documentation](https://webassembly.org/docs/high-level-goals/)

## High Level Language Support

Many different high-level languages like C, C++, and Rust support Wasm as a target.
By incorporating the Mazzaroth system interface these languages can be used
to write and deploy Mazzaroth Smart Contracts.

We currently support Mazzaroth Smart Contracts written in
[Rust](https://github.com/rust-lang/rust) by leveraging the
[mazzaroth-rs](https://github.com/kochavalabs/mazzaroth-rs) library
with support for more languages on the horizon.

## Wasm Runtime

Contracts are compiled to WebAssembly bytecode which are loaded and executed in
a custom WebAssembly (Wasm) virtual machine used by Mazzaroth.
The runtime is a memory-safe sandbox execution environment which allows for a
deterministic execution of functions that are defined within a Wasm binary.
This runtime can be embedded with a custom system interface to
provide access to memory or other outside resources.

## RothVM

The Mazzaroth Virtual Machine (RothVM) is the execution environment that embeds
the Wasm runtime and extends it with a system interface providing host functions
that give Smart Contracts a way to interact with persistent state on the blockchain.
Every Mazzaroth Node contains an instance of RothVM in which to execute transactions.
Transactions may set the Wasm module by performing a contract update,
or execute a function on the module with a Call transaction.

### System Interface

RothVM Supports a set of functions for interacting with the system during the
WebAssembly runtime. It is possible to write contracts that take advantage of
this system interface by using a Mazzaroth library such as
[mazzaroth-rs](https://github.com/kochavalabs/mazzaroth-rs) for Rust.

The following is a list of the System Interface functions available through
RothVM environment and how they can be used by the Wasm module:

| Name | Params | Returns | Description |
|------|--------|---------|-------------|
| _fetch_input | i32 | | Copies the input arguments to memory at the specified pointer location. Should call _input_length first to get the length of input to allocate enough space in WASM memory. |
| _input_length | | i32 | Returns the length of the input arguments passed to a function call. |
| _ret | i32, i32 | | Provides the return value of a function call stored in memory. First param is the memory location of the stored return value, second is the length. |
| _store | i32, i32, i32, i32 | | Stores a key and value in the Contract State DB. First two params describe the key: pointer to memory and length. Second two params describe the value: pointer to memory and length. |
| \_get | i32, i32, i32 | | Gets a value from the Contract State DB by providing a key (pointer and length) and the pointer describing where to copy the value. Should call _get_length first to get the length of the return value to allocate space in memory. |
| _get_length | i32, i32 | i32 | Returns the length of the value returned for when getting a value from the State DB for a provided key. The first param is the pointer to the key in memory, followed by the key length. The return is the length of memory needed to store the value returned. |
| _delete | i32, i32 | | Deletes the provided key from the State DB. Params are the pointer to the key in memory, followed by the key length. |
| _key_exists | i32, i32 | i32 | Returns whether the provided keys exists in the Contract State DB. Params are the pointer to the key in memory, followed by the key length. Returns 1 if they key exists, 0 if it does not. |
| _get_account\_name | i32, i32, i32 | | Gets the name of an Account within the Contract State DB. The first two params are the pointer and length of memory to get the account key. The third param is the pointer in memory to copy the account name. Should call _get_account_name_length first to get the length of the name to allocate space in memory. |
| _get_account_name_length | i32, i32 | i32 | Returns the length of account name for a provided account key store in the Contract State DB. |
| _set_account_name | i32, i32, i32, i32 | | Sets the account name for a given account key in the Contract State DB. The first two params describe the pointer and length of the key in memory. The second two params describe the pointer and length of the name to set for the account key. |
| _is_owner | i32, i32 | i32 | Returns whether the provided account key is the owner of the contract. The params describe the pointer and length of account key in memory. The return value is a 1 if the given key is the owner or 0 otherwise. |
| _kq_json_insert | i32, i32, i32, i32 | i32 | Inserts data into a specified table in the Contract State DB, based on provided JSON. The first two params provided the pointer and length of the table name. The second two params provide the pointer and length of the json query string. Returns 0 if the insert was successful. |
| _kq_query_run | i32, i32, i32 | i32 | Run a query against the Contract State DB and return the hash key to lookup result. The first two params provided the pointer and length of the query. The third param provide the pointer in memory to store the hash (16 bytes should be allocated). Returns the length of the query result know how much space in memory to allocate before fetch. |
| _kq_query_fetch | i32, i32 |  | Gets the result of query that was run against the Contract State DB by providing the hash for lookup. |
| _log | i32, i32 | | Writes a given message to the RothVM log location. The parameters describe the pointer and length of the message store in memory. |
| _log_error | i32, i32 | | Return an error message to RothVM. The parameters describe the pointer and length of the error message store in memory. |
