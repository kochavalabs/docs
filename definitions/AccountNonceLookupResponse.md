# AccountNonceLookupResponse Object

| Field | Value |
|-------|-------|
| nonce | string: The account nonce number used to enforce ordering of transactions. Starts at 0 and increments for each transaction accepted from this account. Transaction Submit from this account must match this nonce to be validated. |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the nonce lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "StateStatus.md"
