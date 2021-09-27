# Block Header Lookup

Lookup block header information for a specific ID.

- /block/header/lookup

## Block Header XDR Reference Object

- [block header xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/block.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: BlockHeaderLookupRequest

!INCLUDE "definitions/BlockHeaderLookupRequest.md", 2

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: BlockHeaderLookupResponse

!INCLUDE "definitions/BlockHeaderLookupResponse.md", 3

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
