# Action Object

| Field | Value |
|-------|-------|
| address | string: The 64 character hex representation of a 32 byte Ed25519 public key of the sender for the transaction. |
| channelID | string: The 64 character hex representation of a 32 byte channel id, which is the target of the transaction. |
| nonce | integer: A random nonce value which is used to allow similar transactions to be processed without being marked duplicate. |
| category | object: The [Category object](#Category-Object). |

!INCLUDE "Category.md"
