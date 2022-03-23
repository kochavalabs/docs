# Receipts

Get the receipt for a specific transaction by providing the Transaction ID.

- /v1/channels/{channelID}/receipts/{transactionID}

## Get Receipt

### Get Request

GET: /v1/channels/{channelID}/receipts/{transactionID}  
Content-Type: application/json  

### Get Responses

- 200 OK

Content-Type: application/json  
Body: Receipt

!INCLUDE "definitions/Receipt.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
