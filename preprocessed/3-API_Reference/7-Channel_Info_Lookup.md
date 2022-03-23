# Channel Info Lookup

Lookup information about the channel, including the Channel Config or Contract binary.

- /channel/info/lookup

## Channel Config XDR Reference Object

- [channel config xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/config.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: ChannelInfoLookupRequest

!INCLUDE "definitions/ChannelInfoLookupRequest.md", 2

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: ChannelInfoLookupResponse

!INCLUDE "definitions/ChannelInfoLookupResponse.md", 3

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
