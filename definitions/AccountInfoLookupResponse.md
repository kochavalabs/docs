# AccountInfoLookupResponse Object

| Field | Value |
|-------|-------|
| accountInfo | object: The [Account Object](#Account-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the account lookup (0 = Unknown, 1 = Found, 2 = Not Found) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "Account.md"

!INCLUDE "StateStatus.md"
