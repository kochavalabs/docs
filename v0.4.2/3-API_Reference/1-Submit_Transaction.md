# Submit Transaction

Submits a Transaction to the channel which can deploy a contract,
execute a function, or grant or revoke permissions on an account.

- /transaction/submit

## Transaction XDR Reference Object

- [transaction xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/transaction.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: TransactionSubmitRequest

### TransactionSubmitRequest Object

| Field | Value |
|-------|-------|
| transaction | object: The [Transaction Object](#Transaction-Object). |

#### Transaction Object

| Field | Value |
|-------|-------|
| signature | string: The 128 character hex representation of a 64 byte Ed25519 signature created by signing the action XDR object. |
| signer | object: The [Authority Object](#Authority-Object) to provide a permissioned ID that signed the transaction if different than the action address. This ID must have been granted permission in order to sign on behalf. |
| action | object: The [Action Object](#Action-Object). |

#### Authority Object

| Field | Value |
|-------|-------|
| enum | integer: Describes if this is a permissioned transaction (0 = None, 1 = Permissioned) |
| value | string: If Permissioned (enum = 1), must contain the 64 character hex representation of the 32 byte public key of the signer. |

#### Action Object

| Field | Value |
|-------|-------|
| address | string: The 64 character hex representation of a 32 byte Ed25519 public key of the sender for the transaction. |
| channelID | string: The 64 character hex representation of a 32 byte channel id, which is the target of the transaction. |
| nonce | integer: A random nonce value which is used to allow similar transactions to be processed without being marked duplicate. |
| category | object: The [Category object](#Category-Object). |

#### Category Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which object is stored in the value field (0 = None, 1 = Call, 2 = Update) |
| value | object: The object which matches the enum value field ([Call](#Call-Object) or [Update](#Update-Object)). |

#### Call Object

| Field | Value |
|-------|-------|
| function | string: The name of the function on the stored contract to execute. |
| parameters | array of strings: JSON arguments to provide to the function. Decoded during Wasm execution to be passed as arguments to the function call. |

#### Update Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of update is contained in the value field (0 = None, 1 = Contract, 2 = Channel Config, 3 = Permission ) |
| value | object: The object which matches the enum value field ([Contract](#Contract-Object), [Channel Config](#Channel-Config-Object), or [Permission](#Permission-Object)). |

#### Contract Object

| Field | Value |
|-------|-------|
| contractBytes | string: Base64 encoded Wasm binary contract to deploy. |
| contractHash  | string: Sha3 256 Hash of the contract bytes, verified on execution. |
| version       | string: The Semver version number of the contract. Must be updated for each unique deploy. |

#### Channel Config Object

| Field | Value |
|-------|-------|
| owner | string: The 64 character hex representation of a 32 byte Ed25519 public key of the owner for this channel. |
| admins | array of strings: A list of IDs (64 character hex public keys), for admin accounts of this channel. Gives these IDs additional privileges such as ability to update the config and deploy contract versions. |

#### Permission Object

| Field | Value |
|-------|-------|
| key | string: The ID (64 character hex public key) to grant or revoke signing permissions on the sender. |
| action | integer: Describes which type of permission action to take (0 = Revoke, 1 = Grant) for the update. Grant gives the key permission to sign transaction on behalf of the sender. Revoke removes a given permission for the key. |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: TransactionSubmitResponse

#### TransactionSubmitResponse Object

| Field | Value |
|-------|-------|
| transactionInfo | object: The [Transaction Info Object](#TransactionInfo-Object). |
| status | integer: The enum result of the transaction submit (0 = Unknown, 1 = Accepted, 2 = Rejected) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

#### TransactionInfo Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of transaction info is contained in the value field (0 = None, 1 = receipt, 2 = transactionID) |
| value | object: The info which matches the enum value field ([Receipt](#Receipt-Object) or transactionID (64 character hex hash)). |

#### Receipt Object

| Field | Value |
|-------|-------|
| status | integer: The enum status of the transaction execution (0 = Failure, 1 = Success) |
| stateRoot | string: The 64 character hex hash of the state DB root after transaction execution. |
| statusInfo | string: Max length 256 char string with some information about the transaction status. |
| result | string: The JSON return value from the transaction execution. |

### 400 Bad Request

Returned when the Request object is not able to be decoded.

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Examples

Call Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 1,
                "value": {
                    "function": "string",
                    "parameters": [
                        "string"
                    ]
                }
            }
        }
    }
}
```

Contract Update Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 1,
                    "value": {
                        "contractBytes": "base64",
                        "contractHash": "0000000000000000000000000000000000000000000000000000000000000000",
                        "version": "string",
                    }
                }
            }
        }
    }
}
```

Config Update Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {
            "enum": 0,
        },
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 2,
                    "value": {
                        "owner": "0000000000000000000000000000000000000000000000000000000000000000",
                        "channelName": "string",
                        "admins": [],
                    }
                }
            }
        }
    }
}
```

Permission Update Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 3,
                    "value": {
                        "key": "0000000000000000000000000000000000000000000000000000000000000001",
                        "action": 1,
                    }
                }
            }
        }
    }
}
```

## JSON to base64 XDR

Install [mazzaroth-cli](https://github.com/kochavalabs/mazzaroth-cli)
to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr TransactionSubmitRequest '{"transaction": {"signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "signer": {}, "action": {"address": "0000000000000000000000000000000000000000000000000000000000000000", "channelID": "0000000000000000000000000000000000000000000000000000000000000000", "nonce": "0", "category": {"enum": 1, "value": { "function": "hello", "parameters": ["Hello World!"]}}}}}'
```

Example Output:

```Bash
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABnN0cmluZwAAAAAAAQAAAARtqx7r
```

## Curl

```Bash
curl --data "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABnN0cmluZwAAAAAAAQAAAARtqx7r" http://localhost:8081/transaction/submit
```

Output:

```Bash
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAKUNvdWxkIG5vdCB2YWxpZGF0ZSBzdWJtaXR0ZWQgdHJhbnNhY3Rpb24uAAAA
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 TransactionSubmitResponse AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAKUNvdWxkIG5vdCB2YWxpZGF0ZSBzdWJtaXR0ZWQgdHJhbnNhY3Rpb24uAAAA
```

output:

```JSON
{
    "transactionID": "0000000000000000000000000000000000000000000000000000000000000000",
    "status": 2,
    "statusInfo": "Could not validate submitted transaction."
}
```
