# Block Headers

Get block header information from a node.

- /v1/channels/{channelID}/blockheaders

## Get Block Header

### Get Request

GET: /v1/channels/{channelID}/blockheaders/{blockID}  
Content-Type: application/json  

### Get Responses

- 200 OK

Content-Type: application/json  
Body: Block Header

!INCLUDE "definitions/BlockHeader.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.

## List Block Headers

### List Request

GET: /v1/channels/{channelID}/blockheaders
Content-Type: application/json  

### List Responses

- 200 OK

Content-Type: application/json  
Body: List of BlockHeaders

!INCLUDE "definitions/BlockHeader.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
