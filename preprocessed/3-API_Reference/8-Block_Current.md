# Block Current

Return the current block that is in the process of being created.

- /block/current

## Responses

### 200 OK

Response Schema: application/json
Object: Block

!INCLUDE "definitions/Block.md", 3

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Example

```JSON
{
  "header": {
    "blockHeight": 0,
    "transactionHeight": 0,
    "consensusSequenceNumber": 0,
    "txMerkleRoot": "0000000000000000000000000000000000000000000000000000000000000000",
    "txReceiptRoot": "0000000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0000000000000000000000000000000000000000000000000000000000000000",
    "previousHeader": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  "transactions": null
}
```

## Curl

```Bash
curl localhost:8081/block/current
```

Output:

```JSON
{"header":{"blockHeight":0,"transactionHeight":0,"consensusSequenceNumber":0,"txMerkleRoot":"0000000000000000000000000000000000000000000000000000000000000000","txReceiptRoot":"0000000000000000000000000000000000000000000000000000000000000000","stateRoot":"0000000000000000000000000000000000000000000000000000000000000000","previousHeader":"0000000000000000000000000000000000000000000000000000000000000000"},"transactions":null}
```
