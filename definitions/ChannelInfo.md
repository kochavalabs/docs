# Channel Info Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of info is contained in the value field (0 = None, 1 = Contract, 2 = Config) |
| value | object: The object which matches the enum value field ([Contract](#Contract-Object) or [Channel Config](#Channel-Config-Object). |

!INCLUDE "Contract.md"

!INCLUDE "ChannelConfig.md"
