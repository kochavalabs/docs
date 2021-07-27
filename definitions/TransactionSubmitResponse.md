# TransactionSubmitResponse Object

| Field | Value |
|-------|-------|
| transactionID | string: The ID (64 character hex hash) of the transaction if it was accepted. |
| status | integer: The enum result of the transaction submit (0 = Unknown, 1 = Accepted, 2 = Rejected) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |
