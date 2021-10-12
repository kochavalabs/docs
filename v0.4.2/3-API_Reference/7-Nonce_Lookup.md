# Nonce Lookup

Lookup the Account nonce for a particular account id.

- /account/nonce/lookup

## Account XDR Reference Object

- [account xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/account.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: AccountNonceLookupRequest

### AccountNonceLookupRequest Object

| Field | Value |
|-------|-------|
| account | object: string: The 64 character hex representation of a 32 byte Ed25519 public key of the account to lookup nonce for. |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: AccountNonceLookupResponse

#### AccountNonceLookupResponse Object

| Field | Value |
|-------|-------|
| nonce | string: The account nonce number used to enforce ordering of transactions. Starts at 0 and increments for each transaction accepted from this account. Transaction Submit from this account must match this nonce to be validated. |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the nonce lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

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
mazzaroth-cli xdr AccountNonceLookupRequest '{"account": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29"}'
```

Example Output:

```Bash
O2onvM62pC1io6jQKm8Nc2UyFXcd4kOmOsBIoYtZ2ik=
```

## Curl

```Bash
curl --data "O2onvM62pC1io6jQKm8Nc2UyFXcd4kOmOsBIoYtZ2ik=" http://localhost:8081/account/nonce/lookup
```

Output:

```Bash
AAAAAAAAAAMAAAAAAAAAAQAAAAAAAAABAAAAAQAAABhGb3VuZCBub25jZSBmb3IgYWNjb3VudC4=
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 AccountNonceLookupResponse AAAAAAAAAAMAAAAAAAAAAQAAAAAAAAABAAAAAQAAABhGb3VuZCBub25jZSBmb3IgYWNjb3VudC4=
```

output:

```JSON
{
   "stateStatus" : {
      "previousBlock" : "1",
      "transactionCount" : "1"
   },
   "status" : 1,
   "statusInfo" : "Found nonce for account.",
   "nonce" : "3"
}
```
