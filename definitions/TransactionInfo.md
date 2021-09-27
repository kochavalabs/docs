# TransactionInfo Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of transaction info is contained in the value field (0 = None, 1 = receipt, 2 = transactionID) |
| value | object: The info which matches the enum value field ([Receipt](#Receipt-Object) or transactionID (64 character hex hash)). |

!INCLUDE "Receipt.md"
