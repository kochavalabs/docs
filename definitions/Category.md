# Category Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which object is stored in the value field (0 = None, 1 = Call (call), 2 = Deploy (contract), 3 = Pause (bool), 4 = Delete (void)) |
| value | object: The object which matches the enum value field 1= ([Call](#Call-Object), 2 = [Contract](#Contract-Object)), 3 = boolean, or 4 = void. |

!INCLUDE "Call.md"

!INCLUDE "Contract.md"
