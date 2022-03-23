# Creating Mazzaroth Accounts

All transactions that are submitted to the network will be signed by a private
key and contain the sender's public key address for authentication and for use
in contracts that depend on the identity of the sender.

A Mazzaroth account can be created by generating an
[Ed25519](https://en.wikipedia.org/wiki/EdDSA#Ed25519) key pair.

The private key should be kept secret and is used to sign transactions to
prove that you are the sender.

The public key is used as your public address id within Mazzaroth and is visible
to others.

The same keys can be used in any Mazzaroth channel including development
networks or public networks. So never share the private key used even for
development if you plan on using the same key pair for a public network.

## Generating a key pair

You can use openssl version 1.1 or higher to generate a private key based on
the ed25519 Curve:

```Bash
openssl genpkey -algorithm ed25519 -outform PEM -out ed25519key.pem
```

This outputs a pem file, which can be useful for those that are already familiar
with the format. PEM files are a bit more difficult to deal with though, so
we've also published a wallet application to docker that can be used to output
a key pair.

```Bash
docker run kochavalabs/mazzaroth-wallet generate-keys
```
