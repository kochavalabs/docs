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

#### Receipt Object

| Field | Value |
|-------|-------|
| transactionID | string: The ID (64 character hex hash) of the transaction for this receipt. |
| status | integer: The enum status of the transaction execution (0 = Unknown, 1 = Success, 2 = Failure) |
| stateRoot | string: The 64 character hex hash of the state DB root after transaction execution. |
| statusInfo | string: Max length 256 char string with some information about the transaction status. |
| result | string: The JSON return value from the transaction execution. |

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
