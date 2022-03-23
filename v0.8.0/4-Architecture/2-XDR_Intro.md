# eXternal Data Representation

## Introduction

*This introduction was taken from [RFC 4506](https://tools.ietf.org/html/rfc4506#section-1)
where the complete definition of the XDR data format can be found.*

XDR is a standard for the description and encoding of data.  It is useful for
transferring data between different computer architectures, and it has been
used to communicate data between such diverse machines as the SUN WORKSTATION,
VAX, IBM-PC, and Cray. XDR fits into the ISO presentation layer and is
roughly analogous in purpose to X.409, ISO Abstract Syntax Notation.  The major
difference between these two is that XDR uses implicit typing, while X.409 uses
explicit typing.

XDR uses a language to describe data formats.  The language can be used only to
describe data; it is not a programming language.  This language allows one to
describe intricate data formats in a concise manner.  The alternative of using
graphical representations (itself an informal language) quickly becomes
incomprehensible when faced with complexity.  The XDR language itself is
similar to the C language, just as Courier is similar to Mesa. Protocols such
as ONC RPC (Remote Procedure Call) and the NFS (Network File System) use XDR to
describe the format of their data.

The XDR standard makes the following assumption: that bytes (or octets) are
portable, where a byte is defined as 8 bits of data.  A given hardware device
should encode the bytes onto the various media in such a way that other hardware
devices may decode the bytes without loss of meaning.  For example, the Ethernet
standard suggests that bytes be encoded in "little-endian" style, or least
significant bit first.

## XDR in Mazzaroth

The data format for a blockchain is very important. A transaction will flow
through different languages and versions of binaries before it is finally
written to the blockchain. Any inconsistency in the data format will invalidate
the signature, so it is important that there isn't ambiguity in the data format.
A simple example of how this could be a problem is what would happen if we had
chosen to use JSON as our data format. The following code snippet demonstrates
the problem in a contrived manner:

```javascript
const myData = '{      "my": "data", "is": "ambiguous"}'
const myKey = '0'.repeat(64)
console.log(sign(myKey, myData).toString('hex')) // 232e83551456c0bf10ac3ad475e3a32801380f0a24f3a9a366b074a57b3c865192f20fa570de50635d4a86a77c3b467d91b1fe6ad081e3574467300c4f516e0d
const interpretedData = JSON.parse(myData)
// Do some work with the data before passing on to the next program
console.log(interpretedData.is) // ambiguous
// Re-serialize to send forward
const outData = JSON.stringify(interpretedData)
console.log(outData) // {"my":"data","is":"ambiguous"}
// Uh oh this isn't the same anymore, the signature isn't valid for my data
```

XDR largely circumvents these ambiguities (union types with default arms being
an exception that we avoid.) We provide [tooling](https://github.com/kochavalabs/xdr-codegen)
that facilitates working in either rust, javascript or golang. We use XDR for
all of our shared datatypes, including the [Mazzaroth-XDR](https://github.com/kochavalabs/mazzaroth-xdr)
which defines the core Mazzaroth data structures.
