# ReadonlyResponse Object

| Field | Value |
|-------|-------|
| result | string: The JSON returned result from executing the function. |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the readonly submit (0 = Unknown, 1 = Success, 2 = Failure) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "StateStatus.md"
