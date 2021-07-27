# TransactionLookupResponse Object

| Field | Value |
|-------|-------|
| transaction | object: The [Transaction Object](#Transaction-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the transaction lookup (0 = Unknown, 1 = Accepted, 2 = Rejected, 3 = Confirmed, 4 = Not Found ) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "Transaction.md"

!INCLUDE "StateStatus.md"
