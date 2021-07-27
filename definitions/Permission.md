# Permission Object

| Field | Value |
|-------|-------|
| key | string: The ID (64 character hex public key) to grant or revoke signing permissions on the sender. |
| action | integer: Describes which type of permission action to take (0 = Revoke, 1 = Grant) for the update. Grant gives the key permission to sign transaction on behalf of the sender. Revoke removes a given permission for the key. |
