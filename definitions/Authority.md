# Authority Object

| Field | Value |
|-------|-------|
| enum | integer: Describes if this is a permissioned transaction (0 = None, 1 = Permissioned) |
| value | string: If Permissioned (enum = 1), must contain the 64 character hex representation of the 32 byte public key of the signer. |
