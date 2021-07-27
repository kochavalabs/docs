# Account Object

| Field | Value |
|-------|-------|
| name | string: The readable name registered to this account. |
| nonce | string: The account nonce number used to enforce ordering of transactions. Starts at 0 and increments for each transaction accepted from this account. Transaction Submit from this account must match this nonce to be validated. |
| permissionedKeys | array of strings: List of IDs (64 character hex public keys) that have permission to sign transactions on behalf of this account. |
