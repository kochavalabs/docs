# Receipt Object

| Field | Value |
|-------|-------|
| status | integer: The enum status of the transaction execution (0 = Failure, 1 = Success) |
| stateRoot | string: The 64 character hex hash of the state DB root after transaction execution. |
| statusInfo | string: Max length 256 char string with some information about the transaction status. |
| result | string: The JSON return value from the transaction execution. |
