# Deterministic Logic

It is important that execution on the blockchain is deterministic,
meaning that a given set of inputs always produce the same output.
This is because every transactions that gets accepted by the consensus
network is executed separately but must produce the same results to ensure
that all nodes will share a consistent channel and ledger state.

## Mazzaroth Virtual Machine

The Mazzaroth Virtual Machine (RothVM) was designed in a way to limit actions
that would result in non-deterministic execution. By using the WebAssembly
instruction format and having strict control over what system interfaces are
available RothVM is able to ensure that the same results will occur on separate
nodes running the same contract functions.

## XDR Serialization

Another way that Mazzaroth guarantees deterministic results is by using
[XDR](https://en.wikipedia.org/wiki/External_Data_Representation) serialization.
XDR is a standard data serialization format that allows objects to be serialized
and deserialized without different results. For example, Transactions are serialized
using XDR for persistent storage and since transaction data is signed it is important
that the serialization is deterministic so that the signature can be verified.
