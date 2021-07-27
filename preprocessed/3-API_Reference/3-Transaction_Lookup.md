# Transaction Lookup

Get information about a specific Transaction by providing the Transaction ID.

- /transaction/lookup

## Transaction XDR Reference Object

- [transaction xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/transaction.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: TransactionLookupRequest

!INCLUDE "definitions/TransactionLookupRequest.md", 2

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: TransactionLookupResponse

!INCLUDE "definitions/TransactionLookupResponse.md", 3

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
