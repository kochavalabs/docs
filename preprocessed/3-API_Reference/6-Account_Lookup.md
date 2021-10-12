# Account Lookup

Lookup account information for a specific ID.

- /account/info/lookup

## Account XDR Reference Object

- [account xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/account.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: AccountInfoLookupRequest

!INCLUDE "definitions/AccountInfoLookupRequest.md", 2

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: AccountInfoLookupResponse

!INCLUDE "definitions/AccountInfoLookupResponse.md", 3

### 400 Bad Request

Returned when the Request object is not able to be decoded.

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Example

```JSON
{
    "account": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29"
}
```

## JSON to base64 XDR

Install mazzaroth-cli to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr AccountInfoLookupRequest '{"account": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29"}'
```

Example Output:

```Bash
O2onvM62pC1io6jQKm8Nc2UyFXcd4kOmOsBIoYtZ2ik=
```

## Curl

```Bash
curl --data "O2onvM62pC1io6jQKm8Nc2UyFXcd4kOmOsBIoYtZ2ik=" http://localhost:8081/account/info/lookup
```

Output:

```Bash
AAAAAAAAAAAAAAADAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAF0ZvdW5kIGluZm8gZm9yIGFjY291bnQuAA==
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 AccountInfoLookupResponse AAAAAAAAAAAAAAADAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAF0ZvdW5kIGluZm8gZm9yIGFjY291bnQuAA==
```

output:

```JSON
{
   "statusInfo" : "Found info for account.",
   "accountInfo" : {
      "name" : "",
      "permissionedKeys" : [],
      "nonce" : "3"
   },
   "stateStatus" : {
      "transactionCount" : "1",
      "previousBlock" : "1"
   },
   "status" : 1
}
```
