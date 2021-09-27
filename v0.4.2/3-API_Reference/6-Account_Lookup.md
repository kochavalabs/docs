# Account Lookup

Lookup account information for a specific ID.

- /account/info/lookup

## Account XDR Reference Object

- [account xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/account.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: AccountInfoLookupRequest

### AccountInfoLookupRequest Object

| Field | Value |
|-------|-------|
| account | string: The 64 character hex representation of a 32 byte Ed25519 public key of the account to lookup. |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: AccountInfoLookupResponse

#### AccountInfoLookupResponse Object

| Field | Value |
|-------|-------|
| accountInfo | object: The [Account Object](#Account-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the account lookup (0 = Unknown, 1 = Found, 2 = Not Found) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

#### Account Object

| Field | Value |
|-------|-------|
| permissionedKeys | array of strings: List of IDs (64 character hex public keys) that have permission to sign transactions on behalf of this account. |

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
