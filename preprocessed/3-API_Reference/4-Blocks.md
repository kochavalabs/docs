# Blocks

Get block information from a node.

- /v1/channels/{channelID}/blocks

## Get Block

### Get Request

GET: /v1/channels/{channelID}/blocks/{blockID}  
Content-Type: application/json  

### Get Responses

- 200 OK

Content-Type: application/json  
Body: Block

!INCLUDE "definitions/Block.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.

## List Blocks

### List Request

GET: /v1/channels/{channelID}/blocks
Content-Type: application/json  

### List Responses

- 200 OK

Content-Type: application/json  
Body: List of Blocks

!INCLUDE "definitions/Block.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.

## Block Height

### Height Request

GET: /v1/channels/{channelID}/blocks/height
Content-Type: application/json  

### Height Responses

- 200 OK

Content-Type: application/json  
Body: Block Height

!INCLUDE "definitions/BlockHeight.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
