# BlockLookupResponse Object

| Field | Value |
|-------|-------|
| block | object: The [Block Object](#Block-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the block lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "Block.md"

!INCLUDE "StateStatus.md"
