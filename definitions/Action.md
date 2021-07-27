# Action Object

| Field | Value |
|-------|-------|
| address | string: The 64 character hex representation of a 32 byte Ed25519 public key of the sender for the transaction. |
| channelID | string: The 64 character hex representation of a 32 byte channel id, which is the target of the transaction. |
| nonce | string: The account nonce number used to enforce ordering of transactions. Must match the expected nonce, starting at 0, of the sender account and increased by 1 for each accepted transaction. |
| category | object: The [Category object](#Category-Object). |

!INCLUDE "Category.md"
