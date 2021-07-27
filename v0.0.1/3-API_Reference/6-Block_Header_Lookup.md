# Block Header Lookup

Lookup block header information for a specific ID.

- /block/header/lookup

## Block Header XDR Reference Object

- [block header xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/block.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: BlockHeaderLookupRequest

### BlockHeaderLookupRequest Object

| Field | Value |
|-------|-------|
| ID | object: The [Identifier Object](#Identifier-Object). |

### Identifier Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of identifier is contained in the value field (0 = None, 1 = Number, 2 = Hash) |
| value | string: If using Number identifier then it is the string number, i.e. "1", else if Hash must be the 64 character hex block header hash. |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: BlockHeaderLookupResponse

#### BlockHeaderLookupResponse Object

| Field | Value |
|-------|-------|
| header | object: The [Block Header Object](#Block-Header-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the header lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

#### Block Header Object

| Field | Value |
|-------|-------|
| timestamp | string: The timestamp applied to this Block. |
| blockHeight | string: The height of this block in the ledger, which starts at block height 0. |
| transactionHeight | string: The highest transaction number stored in this block. |
| consensusSequenceNumber | string: The ending consensus sequence number for commits in this block. |
| txMerkleRoot | string: The 64 character hex hash transaction merkle root. |
| txReceiptRoot | string: The 64 character hex hash receipt merkle root. |
| stateRoot | string: The 64 character hex hash of the state DB root. |
| previousHeader | string: The 64 character hex hash of the previous block header. |
| blockProducerAddress | string: The 64 character hex ID of the Consensus leader that produced the block. |

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
    "ID": {
        "enum": 1,
        "value": "5"
    }
}
```

## JSON to base64 XDR

Install mazzaroth-cli to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr BlockHeaderLookupRequest '{"ID": {"enum": 1, "value": "0"}}'
```

Example Output:

```Bash
AAAAAQAAAAAAAAAA
```

## Curl

```Bash
curl --data "AAAAAQAAAAAAAAAA" http://localhost:8081/block/header/lookup
```

Output:

```Bash
AAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAO8jBkZ1vkHdwlU723iAUD9KLUnl0FJBb0toy8xIoBBv3bFa1tnFpnp4U+YY7YsWB6QKDPRokUuIMN5cRxc8I1LEvXsJTSUgbd8XA5gavhuaUEDA3SYFEhxE8QIKbd3WcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAQAAADBCbG9jayBoYXMgYmVlbiBjcmVhdGVkIGFuZCBzdG9yZWQgb24gdGhlIGxlZGdlci4=
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 BlockHeaderLookupResponse AAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAO8jBkZ1vkHdwlU723iAUD9KLUnl0FJBb0toy8xIoBBv3bFa1tnFpnp4U+YY7YsWB6QKDPRokUuIMN5cRxc8I1LEvXsJTSUgbd8XA5gavhuaUEDA3SYFEhxE8QIKbd3WcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAQAAADBCbG9jayBoYXMgYmVlbiBjcmVhdGVkIGFuZCBzdG9yZWQgb24gdGhlIGxlZGdlci4=
```

output:

```JSON
{
   "statusInfo" : "Block has been created and stored on the ledger.",
   "status" : 1,
   "stateStatus" : {
      "previousBlock" : "1",
      "transactionCount" : "1"
   },
   "header" : {
      "previousHeader" : "0000000000000000000000000000000000000000000000000000000000000000",
      "consensusSequenceNumber" : "0",
      "transactionHeight" : "2",
      "txMerkleRoot" : "ef23064675be41ddc2553bdb7880503f4a2d49e5d052416f4b68cbcc48a0106f",
      "txReceiptRoot" : "ddb15ad6d9c5a67a7853e618ed8b1607a40a0cf468914b8830de5c47173c2352",
      "blockProducerAddress" : "0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp" : "",
      "stateRoot" : "c4bd7b094d25206ddf1703981abe1b9a5040c0dd2605121c44f1020a6dddd673",
      "blockHeight" : "0"
   }
}
```
