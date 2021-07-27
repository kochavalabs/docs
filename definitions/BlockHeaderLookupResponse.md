# BlockHeaderLookupResponse Object

| Field | Value |
|-------|-------|
| header | object: The [Block Header Object](#Block-Header-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the header lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "BlockHeader.md"

!INCLUDE "StateStatus.md"
