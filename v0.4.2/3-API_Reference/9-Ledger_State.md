# Ledger State

Return the ledger state status object.

- /ledger/state

## Responses

### 200 OK

Response Schema: application/json
Object: StateStatus

#### StateStatus Object

| Field | Value |
|-------|-------|
| previousBlock | string: The last committed block number. |
| transactionCount | string: The number of transactions in the current block.

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Example

```JSON
{
  "previousBlock": 0,
  "transactionCount": 0
}
```

## Curl

```Bash
curl localhost:8081/ledger/state
```

Output:

```JSON
{"previousBlock":0,"transactionCount":0}
```
