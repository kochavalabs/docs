# Block Current

Return the current block that is in the process of being created.

- /block/current

## Request

Request Body Schema: application/json  
Object: ABIRequest

### ABI Request Object

| Field | Value |
|-------|-------|
| channelID | string: The 64 character hex representation of a 32 byte channel id, for which to lookup the ABI. |

## Responses

### 200 OK

Response Schema: application/json
Object: ABI

!INCLUDE "definitions/ABI.md", 3

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Example

```JSON
{
  "functions": [
    {
      "functionType": "function",
      "name": "setup",
      "inputs": null,
      "outputs": [
        {
          "name": "returnValue0",
          "parameterType": "bool",
          "codec": "bytes"
        }
      ]
    },
    {
      "functionType": "readonly",
      "name": "simple",
      "inputs": null,
      "outputs": [
        {
          "name": "returnValue0",
          "parameterType": "string",
          "codec": "bytes"
        }
      ]
    },
    {
      "functionType": "function",
      "name": "args",
      "inputs": [
        {
          "name": "one",
          "parameterType": "string",
          "codec": "bytes"
        },
        {
          "name": "two",
          "parameterType": "string",
          "codec": "bytes"
        },
        {
          "name": "three",
          "parameterType": "string",
          "codec": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "returnValue0",
          "parameterType": "uint32",
          "codec": "bytes"
        }
      ]
    },
    {
      "functionType": "function",
      "name": "complex",
      "inputs": [
        {
          "name": "foo_arg",
          "parameterType": "Foo",
          "codec": "bytes"
        },
        {
          "name": "bar_arg",
          "parameterType": "Bar",
          "codec": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "returnValue0",
          "parameterType": "string",
          "codec": "bytes"
        }
      ]
    },
    {
      "functionType": "function",
      "name": "insert_foo",
      "inputs": [
        {
          "name": "foo",
          "parameterType": "Foo",
          "codec": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "returnValue0",
          "parameterType": "int32[]",
          "codec": "bytes"
        }
      ]
    },
    {
      "functionType": "function",
      "name": "query_foo",
      "inputs": [
        {
          "name": "where_clause",
          "parameterType": "string",
          "codec": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "returnValue0",
          "parameterType": "Foo[]",
          "codec": "bytes"
        }
      ]
    }
  ]
}
```

## Curl

```Bash
curl -H "Content-Type: application/json" localhost:8081/abi --data '{ "channelID": "0000000000000000000000000000000000000000000000000000000000000000" }'
```

Output:

```JSON
{"functions":[{"functionType":"function","name":"setup","inputs":null,"outputs":[{"name":"returnValue0","parameterType":"bool","codec":"bytes"}]},{"functionType":"readonly","name":"simple","inputs":null,"outputs":[{"name":"returnValue0","parameterType":"string","codec":"bytes"}]},{"functionType":"function","name":"args","inputs":[{"name":"one","parameterType":"string","codec":"bytes"},{"name":"two","parameterType":"string","codec":"bytes"},{"name":"three","parameterType":"string","codec":"bytes"}],"outputs":[{"name":"returnValue0","parameterType":"uint32","codec":"bytes"}]},{"functionType":"function","name":"complex","inputs":[{"name":"foo_arg","parameterType":"Foo","codec":"bytes"},{"name":"bar_arg","parameterType":"Bar","codec":"bytes"}],"outputs":[{"name":"returnValue0","parameterType":"string","codec":"bytes"}]},{"functionType":"function","name":"insert_foo","inputs":[{"name":"foo","parameterType":"Foo","codec":"bytes"}],"outputs":[{"name":"returnValue0","parameterType":"int32[]","codec":"bytes"}]},{"functionType":"function","name":"query_foo","inputs":[{"name":"where_clause","parameterType":"string","codec":"bytes"}],"outputs":[{"name":"returnValue0","parameterType":"Foo[]","codec":"bytes"}]}]}
```
