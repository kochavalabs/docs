# Contract Object

| Field | Value |
|-------|-------|
| owner | string: The 64 character hex representation of a 32 byte Ed25519 public key of the owner for the contract. |
| abi | object: The [ABI Object](#ABI-Object) that defines the functions of the contract. |
| contractBytes | string: Base64 encoded Wasm binary contract to deploy. |
| contractHash  | string: Sha3 256 Hash of the contract bytes, verified on execution. |
| version       | string: The Semver version number of the contract. Must be updated for each unique deploy. |
