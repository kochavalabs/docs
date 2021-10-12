# Block Lookup

Lookup block information for a specific ID.

- /block/lookup

## Block XDR Reference Object

- [block xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/block.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: BlockLookupRequest

### BlockLookupRequest Object

| Field | Value |
|-------|-------|
| identifier | object: The [Identifier Object](#Identifier-Object). |

### Identifier Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of identifier is contained in the value field (0 = None, 1 = Number, 2 = Hash) |
| value | string: If using Number identifier then it is the string number, i.e. "1", else if Hash must be the 64 character hex block header hash. |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: BlockLookupResponse

#### BlockLookupResponse Object

| Field | Value |
|-------|-------|
| block | object: The [Block Object](#Block-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the block lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

#### Block Object

| Field | Value |
|-------|-------|
| header | object: The [Block Header Object](#Block-Header-Object). |
| transactions | array of objects: The list of transaction objects in this block. |

#### Block Header Object

| Field | Value |
|-------|-------|
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
mazzaroth-cli xdr BlockLookupRequest '{"ID": {"enum": 1, "value": "1"}}'
```

Example Output:

```Bash
AAAAAQAAAAAAAAAB
```

## Curl

```Bash
curl --data "AAAAAQAAAAAAAAAB" http://localhost:8081/block/lookup
```

Output:

```Bash
AAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAO8jBkZ1vkHdwlU723iAUD9KLUnl0FJBb0toy8xIoBBv3bFa1tnFpnp4U+YY7YsWB6QKDPRokUuIMN5cRxc8I1LEvXsJTSUgbd8XA5gavhuaUEDA3SYFEhxE8QIKbd3WcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAQAAADBCbG9jayBoYXMgYmVlbiBjcmVhdGVkIGFuZCBzdG9yZWQgb24gdGhlIGxlZGdlci4=
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 BlockLookupResponse AAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAO8jBkZ1vkHdwlU723iAUD9KLUnl0FJBb0toy8xIoBBv3bFa1tnFpnp4U+YY7YsWB6QKDPRokUuIMN5cRxc8I1LEvXsJTSUgbd8XA5gavhuaUEDA3SYFEhxE8QIKbd3WcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAQAAADBCbG9jayBoYXMgYmVlbiBjcmVhdGVkIGFuZCBzdG9yZWQgb24gdGhlIGxlZGdlci4=
```

output:

```JSON
{
   "block" : {
      "header" : {
         "stateRoot" : "0000000000000000000000000000000000000000000000000000000000000000",
         "previousHeader" : "0000000000000000000000000000000000000000000000000000000000000000",
         "txReceiptRoot" : "0000000000000000000000000000000000000000000000000000000000000000",
         "blockHeight" : "0",
         "timestamp" : "",
         "consensusSequenceNumber" : "0",
         "transactionHeight" : "0",
         "blockProducerAddress" : "0000000000000000000000000000000000000000000000000000000000000000",
         "txMerkleRoot" : "0000000000000000000000000000000000000000000000000000000000000000"
      },
      "transactions" : []
   },
   "status" : 3,
   "stateStatus" : {
      "transactionCount" : "1",
      "previousBlock" : "1"
   },
   "statusInfo" : "key not found in kv store"
}
```
