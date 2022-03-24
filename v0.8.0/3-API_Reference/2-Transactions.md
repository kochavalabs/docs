# Transactions

Submit a Transaction to a node or lookup transactions.

- /v1/channels/{channelID}/transactions

## Submit Transaction

### Submit Request

POST: /v1/channels/{channelID}/transactions
Content-Type: application/json  
Body: Transaction

#### Transaction Object

| Field | Value |
|-------|-------|
| signature | string: The 128 character hex representation of a 64 byte Ed25519 signature created by signing the action XDR object. |
| sender | string: The 64 character hex representation of a 32 byte Ed25519 public key of the sender for the transaction. |
| data | object: The [Data Object](#Data-Object). |

#### Action Object

| Field | Value |
|-------|-------|
| channelID | string: The 64 character hex representation of a 32 byte channel id, which is the target of the transaction. |
| nonce | integer: A random nonce value which is used to allow similar transactions to be processed without being marked duplicate. |
| blockExpirationNumber | integer: The highest block number in which to accept this transaction. Used to expire outdated transactions. |
| category | object: The [Category object](#Category-Object). |

#### Category Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which object is stored in the value field (0 = None, 1 = Call (call), 2 = Deploy (contract), 3 = Pause (bool), 4 = Delete (void)) |
| value | object: The object which matches the enum value field 1= ([Call](#Call-Object), 2 = [Contract](#Contract-Object)), 3 = boolean, or 4 = void. |

#### Call Object

| Field | Value |
|-------|-------|
| function | string: The name of the function on the stored contract to execute. |
| parameters | array of strings: JSON arguments to provide to the function. Decoded during Wasm execution to be passed as arguments to the function call. |

#### Contract Object

| Field | Value |
|-------|-------|
| owner | string: The 64 character hex representation of a 32 byte Ed25519 public key of the owner for the contract. |
| abi | object: The [ABI Object](#ABI-Object) that defines the functions of the contract. |
| contractBytes | string: Base64 encoded Wasm binary contract to deploy. |
| contractHash  | string: Sha3 256 Hash of the contract bytes, verified on execution. |
| version       | string: The Semver version number of the contract. Must be updated for each unique deploy. |

### Submit Responses

On success, the response depends on if the Transaction was a WRITE or READ.

- 200 OK - Write Transaction

Content-Type: application/json  
Body: Transaction ID

- 200 OK - Read Transaction

Content-Type: application/json  
Body: Receipt

#### Receipt Object

| Field | Value |
|-------|-------|
| transactionID | string: The ID (64 character hex hash) of the transaction for this receipt. |
| status | integer: The enum status of the transaction execution (0 = Unknown, 1 = Success, 2 = Failure) |
| stateRoot | string: The 64 character hex hash of the state DB root after transaction execution. |
| statusInfo | string: Max length 256 char string with some information about the transaction status. |
| result | string: The JSON return value from the transaction execution. |

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.

## Get Transaction

Get information about a specific Transaction by providing the Transaction ID.

- /v1/channels/{channelID}/transactions/{transactionID}

### Get Request

GET: /v1/channels/{channelID}/transactions/{transactionID}  
Content-Type: application/json  

### Get Responses

- 200 OK

Content-Type: application/json  
Body: Transaction

#### Transaction Object

| Field | Value |
|-------|-------|
| signature | string: The 128 character hex representation of a 64 byte Ed25519 signature created by signing the action XDR object. |
| sender | string: The 64 character hex representation of a 32 byte Ed25519 public key of the sender for the transaction. |
| data | object: The [Data Object](#Data-Object). |

#### Action Object

| Field | Value |
|-------|-------|
| channelID | string: The 64 character hex representation of a 32 byte channel id, which is the target of the transaction. |
| nonce | integer: A random nonce value which is used to allow similar transactions to be processed without being marked duplicate. |
| blockExpirationNumber | integer: The highest block number in which to accept this transaction. Used to expire outdated transactions. |
| category | object: The [Category object](#Category-Object). |

#### Category Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which object is stored in the value field (0 = None, 1 = Call (call), 2 = Deploy (contract), 3 = Pause (bool), 4 = Delete (void)) |
| value | object: The object which matches the enum value field 1= ([Call](#Call-Object), 2 = [Contract](#Contract-Object)), 3 = boolean, or 4 = void. |

#### Call Object

| Field | Value |
|-------|-------|
| function | string: The name of the function on the stored contract to execute. |
| parameters | array of strings: JSON arguments to provide to the function. Decoded during Wasm execution to be passed as arguments to the function call. |

#### Contract Object

| Field | Value |
|-------|-------|
| owner | string: The 64 character hex representation of a 32 byte Ed25519 public key of the owner for the contract. |
| abi | object: The [ABI Object](#ABI-Object) that defines the functions of the contract. |
| contractBytes | string: Base64 encoded Wasm binary contract to deploy. |
| contractHash  | string: Sha3 256 Hash of the contract bytes, verified on execution. |
| version       | string: The Semver version number of the contract. Must be updated for each unique deploy. |

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
