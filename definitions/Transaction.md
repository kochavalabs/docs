# Transaction Object

| Field | Value |
|-------|-------|
| signature | string: The 128 character hex representation of a 64 byte Ed25519 signature created by signing the action XDR object. |
| sender | string: The 64 character hex representation of a 32 byte Ed25519 public key of the sender for the transaction. |
| data | object: The [Data Object](#Data-Object). |

!INCLUDE "Data.md"
