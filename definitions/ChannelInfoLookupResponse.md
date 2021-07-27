# ChannelInfoLookupResponse Object

| Field | Value |
|-------|-------|
| channelInfo | object: The [Channel Info Object](#Channel-Info-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the channel lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

!INCLUDE "ChannelInfo.md"

!INCLUDE "StateStatus.md"
