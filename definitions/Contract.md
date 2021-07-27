# Contract Object

| Field | Value |
|-------|-------|
| contractBytes | string: Base64 encoded Wasm binary contract to deploy. |
| contractHash  | string: Sha3 256 Hash of the contract bytes, verified on execution. |
| version       | string: The Semver version number of the contract. Must be updated for each unique deploy. |
