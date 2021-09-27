# Channel Config Object

| Field | Value |
|-------|-------|
| owner | string: The 64 character hex representation of a 32 byte Ed25519 public key of the owner for this channel. |
| admins | array of strings: A list of IDs (64 character hex public keys), for admin accounts of this channel. Gives these IDs additional privileges such as ability to update the config and deploy contract versions. |
