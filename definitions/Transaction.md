# Transaction Object

| Field | Value |
|-------|-------|
| signature | string: The 128 character hex representation of a 64 byte Ed25519 signature created by signing the action XDR object. |
| signer | object: The [Authority Object](#Authority-Object) to provide a permissioned ID that signed the transaction if different than the action address. This ID must have been granted permission in order to sign on behalf. |
| action | object: The [Action Object](#Action-Object). |

!INCLUDE "Authority.md"

!INCLUDE "Action.md"
