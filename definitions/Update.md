# Update Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of update is contained in the value field (0 = None, 1 = Contract, 2 = Channel Config, 3 = Permission ) |
| value | object: The object which matches the enum value field ([Contract](#Contract-Object), [Channel Config](#Channel-Config-Object), or [Permission](#Permission-Object)). |

!INCLUDE "Contract.md"

!INCLUDE "ChannelConfig.md"

!INCLUDE "Permission.md"
