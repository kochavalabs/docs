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

#### Block Header Object

| Field | Value |
|-------|-------|
| blockHeight | string: The height of this block in the ledger, which starts at block height 0. |
| transactionHeight | string: The highest transaction number stored in this block. |
| consensusSequenceNumber | string: The ending consensus sequence number for commits in this block. |
| txMerkleRoot | string: The 64 character hex hash transaction merkle root. |
| txReceiptRoot | string: The 64 character hex hash receipt merkle root. |
| stateRoot | string: The 64 character hex hash of the state DB root. |
| previousHeader | string: The 64 character hex hash of the previous block header. |
| status | integer: The enum status of the block (0 = Unknown, 3 = Pending, 4 = Finalized) |

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

#### Block Header Object

| Field | Value |
|-------|-------|
| blockHeight | string: The height of this block in the ledger, which starts at block height 0. |
| transactionHeight | string: The highest transaction number stored in this block. |
| consensusSequenceNumber | string: The ending consensus sequence number for commits in this block. |
| txMerkleRoot | string: The 64 character hex hash transaction merkle root. |
| txReceiptRoot | string: The 64 character hex hash receipt merkle root. |
| stateRoot | string: The 64 character hex hash of the state DB root. |
| previousHeader | string: The 64 character hex hash of the previous block header. |
| status | integer: The enum status of the block (0 = Unknown, 3 = Pending, 4 = Finalized) |

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
