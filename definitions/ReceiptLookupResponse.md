# ReceiptLookupResponse Object

| Field | Value |
|-------|-------|
| receipt | object: The [Receipt Object](#Receipt-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the receipt lookup (0 = Unknown, 1 = Found, 2 = Not Found) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "Receipt.md"

!INCLUDE "StateStatus.md"
