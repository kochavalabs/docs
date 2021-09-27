# TransactionSubmitResponse Object

| Field | Value |
|-------|-------|
| transactionInfo | object: The [Transaction Info Object](#TransactionInfo-Object). |
| status | integer: The enum result of the transaction submit (0 = Unknown, 1 = Accepted, 2 = Rejected) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "TransactionInfo.md"
