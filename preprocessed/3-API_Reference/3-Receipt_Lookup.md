# Receipt Lookup

Get the receipt for a specific transaction by providing the Transaction ID.

- /receipt/lookup

## Receipt XDR Reference Object

- [transaction xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/receipt.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: ReceiptLookupRequest

!INCLUDE "definitions/ReceiptLookupRequest.md", 2

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: ReceiptLookupResponse

!INCLUDE "definitions/ReceiptLookupResponse.md", 3

### 400 Bad Request

Returned when the Request object is not able to be decoded.

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Example

```JSON
{
    "transactionID": "77c927eb749d541bd7f6e19e2662d4da11ed4355cb75fc71c3e787349dc253db"
}
```

## JSON to base64 XDR

Install mazzaroth-cli to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr ReceiptLookupRequest '{"transactionID": "77c927eb749d541bd7f6e19e2662d4da11ed4355cb75fc71c3e787349dc253db"}'
```

Example Output:

```Bash
d8kn63SdVBvX9uGeJmLU2hHtQ1XLdfxxw+eHNJ3CU9s=
```

## Curl

```Bash
curl --data "d8kn63SdVBvX9uGeJmLU2hHtQ1XLdfxxw+eHNJ3CU9s=" http://localhost:8081/receipt/lookup
```

Output:

```Bash
AAAAAQwZ2DC+GfzdV7UPw15cE/P6KQawvWjsfMgpLh4i//8qAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAG1JlY2VpcHQgc3VjY2Vzc2Z1bGx5IGZvdW5kLgA=
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 ReceiptLookupResponse AAAAAQwZ2DC+GfzdV7UPw15cE/P6KQawvWjsfMgpLh4i//8qAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAG1JlY2VpcHQgc3VjY2Vzc2Z1bGx5IGZvdW5kLgA=
```

output:

```JSON
{
   "stateStatus" : {
      "transactionCount" : "1",
      "previousBlock" : "1"
   },
   "status" : 1,
   "receipt" : {
      "stateRoot" : "0c19d830be19fcdd57b50fc35e5c13f3fa2906b0bd68ec7cc8292e1e22ffff2a",
      "result" : "",
      "status" : 1
   },
   "statusInfo" : "Receipt successfully found."
}
```
