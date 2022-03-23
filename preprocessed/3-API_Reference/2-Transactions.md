# Transactions

Submit a Transaction to a node or lookup transactions.

- /v1/channels/{channelID}/transactions

## Submit Transaction

### Submit Request

POST: /v1/channels/{channelID}/transactions
Content-Type: application/json  
Body: Transaction

!INCLUDE "definitions/Transaction.md", 3

### Submit Responses

On success, the response depends on if the Transaction was a WRITE or READ.

- 200 OK - Write Transaction

Content-Type: application/json  
Body: Transaction ID

!INCLUDE "definitions/Receipt.md", 3

- 200 OK - Read Transaction

Content-Type: application/json  
Body: Receipt

!INCLUDE "definitions/Receipt.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.

## Get Transaction

Get information about a specific Transaction by providing the Transaction ID.

- /v1/channels/{channelID}/transactions/{transactionID}

### Get Request

GET: /v1/channels/{channelID}/transactions/{transactionID}  
Content-Type: application/json  

### Get Responses

- 200 OK

Content-Type: application/json  
Body: Transaction

!INCLUDE "definitions/Transaction.md", 3

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
