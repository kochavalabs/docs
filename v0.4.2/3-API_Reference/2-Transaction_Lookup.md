# Transaction Lookup

Get information about a specific Transaction by providing the Transaction ID.

- /transaction/lookup

## Transaction XDR Reference Object

- [transaction xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/transaction.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: TransactionLookupRequest

### TransactionLookupRequest Object

| Field | Value |
|-------|-------|
| transactionID | string: The ID (64 character hex hash) of the transaction to lookup. |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: TransactionLookupResponse

#### TransactionLookupResponse Object

| Field | Value |
|-------|-------|
| transaction | object: The [Transaction Object](#Transaction-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the transaction lookup (0 = Unknown, 1 = Accepted, 2 = Rejected, 3 = Confirmed, 4 = Not Found ) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

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
| nonce | string: The account nonce number used to enforce ordering of transactions. Must match the expected nonce, starting at 0, of the sender account and increased by 1 for each accepted transaction. |
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

#### StateStatus Object

| Field | Value |
|-------|-------|
| previousBlock | string: The last committed block number. |
| transactionCount | string: The number of transactions in the current block.

### 400 Bad Request

Returned when the Request object is not able to be decoded.

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Example

```JSON
{
    "transactionID": "05b48c93b4210ad5513ed89fb478eb41b9bf7c76af989f2b512a5123a7d72477"
}
```

## JSON to base64 XDR

Install mazzaroth-cli to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr TransactionLookupRequest '{"transactionID": "05b48c93b4210ad5513ed89fb478eb41b9bf7c76af989f2b512a5123a7d72477"}'
```

Example Output:

```Bash
BbSMk7QhCtVRPtiftHjrQbm/fHavmJ8rUSpRI6fXJHc=
```

## Curl

```Bash
curl --data "BbSMk7QhCtVRPtiftHjrQbm/fHavmJ8rUSpRI6fXJHc=" http://localhost:8081/transaction/lookup
```

Output:

```Bash
jFoIJCJ2GJIZ3ewfoZYX5bX02nvUniSKbyZ7KALQ69lDSrUv+OmkP14/uI/YoRifgSr3w7kkTjXPfRwp/bJcDwAAAAA7aie8zrakLWKjqNAqbw1zZTIVdx3iQ6Y6wEihi1naKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt0GAkAAAABAAAACmluc2VydC1mb28AAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAwAAADRUcmFuc2FjdGlvbiBoYXMgYmVlbiBhY2NlcHRlZCBhbmQgaXMgYmVpbmcgZXhlY3V0ZWQu
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 TransactionLookupResponse jFoIJCJ2GJIZ3ewfoZYX5bX02nvUniSKbyZ7KALQ69lDSrUv+OmkP14/uI/YoRifgSr3w7kkTjXPfRwp/bJcDwAAAAA7aie8zrakLWKjqNAqbw1zZTIVdx3iQ6Y6wEihi1naKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt0GAkAAAABAAAACmluc2VydC1mb28AAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAwAAADRUcmFuc2FjdGlvbiBoYXMgYmVlbiBhY2NlcHRlZCBhbmQgaXMgYmVpbmcgZXhlY3V0ZWQu
```

output:

```JSON
{
  "transaction": {
    "signature": "8c5a08242276189219ddec1fa19617e5b5f4da7bd49e248a6f267b2802d0ebd9434ab52ff8e9a43f5e3fb88fd8a1189f812af7c3b9244e35cf7d1c29fdb25c0f",
    "signer": {
      "enum": 0,
      "value": ""
    },
    "action": {
      "address": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29",
      "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "192157705",
      "category": {
        "enum": 1,
        "value": {
          "function": "insert-foo",
          "parameters": []
        }
      }
    }
  },
  "stateStatus": {
    "previousBlock": "0",
    "transactionCount": "10"
  },
  "status": 3,
  "statusInfo": "Transaction has been accepted and is being executed."
}
```
