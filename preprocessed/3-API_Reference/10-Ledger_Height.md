# Ledger Height

Return the height of the ledger, which is an
indication of how many blocks have been finalized.

- /ledger/height

## Responses

### 200 OK

Response Schema: application/json
Object: Number

### 500 Internal Server Error

Returned if there is a server error handling the request.

## Curl

```Bash
curl localhost:8081/ledger/height
```

Output:

```JSON
0
```
