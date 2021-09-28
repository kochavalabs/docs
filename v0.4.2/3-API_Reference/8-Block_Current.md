# Block Current

Return the current block that is in the process of being created.

- /block/current

## Responses

### 200 OK

Response Schema: application/json
Object: Block

#### Block Object

| Field | Value |
|-------|-------|
| header | object: The [Block Header Object](#Block-Header-Object). |
| transactions | array of objects: The list of transaction objects in this block. |

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
| blockProducerAddress | string: The 64 character hex ID of the Consensus leader that produced the block. |

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
