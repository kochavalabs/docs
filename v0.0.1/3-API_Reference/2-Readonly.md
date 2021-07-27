# Readonly

Submits a Readonly Transaction to the channel which can execute a function
without updating state. The transaction is executed directly against the
state of the Readonly node instead of being sent through consensus.
This means that the result of execution may be outdated if the Readonly
node is not completely in sync with the rest of the network or if one
or more transactions being sent through consensus would affect the
execution result, but have not yet been committed.

- /readonly

## Transaction XDR Reference Object

- [transaction xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/transaction.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: ReadonlyRequest

### ReadonlyRequest Object

| Field | Value |
|-------|-------|
| call | object: The [Call Object](#Call-Object). |

### Call Object

| Field | Value |
|-------|-------|
| function | string: The name of the function on the stored contract to execute. |
| parameters | array of strings: JSON arguments to provide to the function. Decoded during Wasm execution to be passed as arguments to the function call. |

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: ReadonlyResponse

#### ReadonlyResponse Object

| Field | Value |
|-------|-------|
| result | string: The JSON returned result from executing the function. |
| stateStatus | object: The [StateStatus Object](#StateStatus-Object). |
| status | integer: The enum result of the readonly submit (0 = Unknown, 1 = Success, 2 = Failure) |
| statusInfo | string: The readable string status stating the result of the transaction submit. |

#### StateStatus Object

| Field | Value |
|-------|-------|
| previousBlock | string: The last committed block number. |
| transactionCount | string: The number of transactions in the current block.

### 400 Bad Request

Returned when the Request object is not able to be decoded.

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Example

```JSON
{
    "call": {
        "function": "total_supply"
    }
}
```

## JSON to base64 XDR

Install mazzaroth-cli to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr ReadonlyRequest '{"call": {"function": "hello", "parameters": ["Hello World!"]}}'
```

Example Output:

```Bash
AAAABWhlbGxvAAAAAAAAAQAAAAxIZWxsbyBXb3JsZCE=
```

## Curl

```Bash
curl --data "AAAABWhlbGxvAAAAAAAAAQAAAAxIZWxsbyBXb3JsZCE=" http://localhost:8081/readonly
```

Output:

```Bash
AAAAAjE0AAAAAAAAAAAAAAAAAAAAAAACAAAAAQAAACdSZWFkb25seSByZXF1ZXN0IGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseS4A
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 ReadonlyResponse AAAAAjE0AAAAAAAAAAAAAAAAAAAAAAACAAAAAQAAACdSZWFkb25seSByZXF1ZXN0IGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseS4A
```

output:

```JSON
{
   "statusInfo" : "Readonly request executed successfully.",
   "status" : 1,
   "result" : "14",
   "stateStatus" : {
      "transactionCount" : "2",
      "previousBlock" : "0"
   }
}
```
