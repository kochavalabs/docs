# Channels

Lookup information about the channel, including the ABI or Contract binary.

- /v1/channels

## Channel Contract

### Contract Request

GET: /v1/channels/{channelID}/contract  
Content-Type: application/json  

### Contract Responses

- 200 OK

Response Schema: XDR  
Encoding: base64  
Object: Contract

!INCLUDE "definitions/Contract.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.

## Channel ABI

### ABI Request

GET: /v1/channels/{channelID}/abi  
Content-Type: application/json  

### ABI Responses

- 200 OK

Response Schema: XDR  
Encoding: base64  
Object: ABI

!INCLUDE "definitions/ABI.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
