# Data Object

| Field | Value |
|-------|-------|
| channelID | string: The 64 character hex representation of a 32 byte channel id, which is the target of the transaction. |
| nonce | integer: A random nonce value which is used to allow similar transactions to be processed without being marked duplicate. |
| blockExpirationNumber | integer: The highest block number in which to accept this transaction. Used to expire outdated transactions. |
| category | object: The [Category object](#Category-Object). |

!INCLUDE "Category.md"
