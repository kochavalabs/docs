# Channel Info Lookup

Lookup information about the channel, including the Channel Config or Contract binary.

- /channel/info/lookup

## Channel Config XDR Reference Object

- [channel config xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/config.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: ChannelInfoLookupRequest

### ChannelInfoLookupRequest Object

| Field | Value |
|-------|-------|
| infoType | integer: The Info type enum to request (0 = None, 1 = Contract, 2 = Config). |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: ChannelInfoLookupResponse

#### ChannelInfoLookupResponse Object

| Field | Value |
|-------|-------|
| channelInfo | object: The [Channel Info Object](#Channel-Info-Object). |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the channel lookup (0 = Unknown, 1 = Found, 2 = Not Found)  |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

#### Channel Info Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of info is contained in the value field (0 = None, 1 = Contract, 2 = Config) |
| value | object: The object which matches the enum value field ([Contract](#Contract-Object) or [Channel Config](#Channel-Config-Object). |

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
    "infoType": 2
}
```

## JSON to base64 XDR

Install mazzaroth-cli to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr ChannelInfoLookupRequest '{"infoType": 2}'
```

Example Output:

```Bash
AAAAAg==
```

## Curl

```Bash
curl --data "AAAAAg==" http://localhost:8081/channel/info/lookup
```

Output:

```Bash
AAAAAjtqJ7zOtqQtYqOo0CpvDXNlMhV3HeJDpjrASKGLWdopAAAAD0V4YW1wbGUgQ2hhbm5lbAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAEAAAAXRm91bmQgaW5mbyBmb3IgY2hhbm5lbC4A
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 ChannelInfoLookupResponse AAAAAjtqJ7zOtqQtYqOo0CpvDXNlMhV3HeJDpjrASKGLWdopAAAAD0V4YW1wbGUgQ2hhbm5lbAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAEAAAAXRm91bmQgaW5mbyBmb3IgY2hhbm5lbC4A
```

output:

```JSON
{
  "channelInfo": {
    "enum": 2,
    "value": {
      "owner": "3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29",
      "channelName": "Example Channel",
      "admins": []
    }
  },
  "stateStatus": {
    "previousBlock": "0",
    "transactionCount": "9"
  },
  "status": 1,
  "statusInfo": "Found info for channel."
}```
