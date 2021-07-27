# Block Lookup

Lookup block information for a specific ID.

- /block/lookup

## Block XDR Reference Object

- [block xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/block.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: BlockLookupRequest

!INCLUDE "definitions/BlockLookupRequest.md", 2

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: BlockLookupResponse

!INCLUDE "definitions/BlockLookupResponse.md", 3

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
