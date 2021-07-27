# Submit Transaction

Submits a Transaction to the channel which can deploy a contract,
execute a function, or grant or revoke permissions on an account.

- /transaction/submit

## Transaction XDR Reference Object

- [transaction xdr](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/transaction.x)

## Request

Request Body Schema: XDR  
Encoding: base64  
Object: TransactionSubmitRequest

!INCLUDE "definitions/TransactionSubmitRequest.md", 2

## Responses

### 200 OK

Response Schema: XDR  
Encoding: base64  
Object: TransactionSubmitResponse

!INCLUDE "definitions/TransactionSubmitResponse.md", 3

### 400 Bad Request

Returned when the Request object is not able to be decoded.

### 500 Internal Server Error

Returned if there is a server error handling the request.

## JSON Examples

Call Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 1,
                "value": {
                    "function": "string",
                    "parameters": [
                        "string"
                    ]
                }
            }
        }
    }
}
```

Contract Update Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 1,
                    "value": {
                        "contractBytes": "base64",
                        "contractHash": "0000000000000000000000000000000000000000000000000000000000000000",
                        "version": "string",
                    }
                }
            }
        }
    }
}
```

Config Update Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {
            "enum": 0,
        },
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 2,
                    "value": {
                        "owner": "0000000000000000000000000000000000000000000000000000000000000000",
                        "channelName": "string",
                        "admins": [],
                    }
                }
            }
        }
    }
}
```

Permission Update Transaction:

```JSON
{
    "transaction": {
        "signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signer": {},
        "action": {
            "address": "0000000000000000000000000000000000000000000000000000000000000000",
            "channelID": "0000000000000000000000000000000000000000000000000000000000000000",
            "nonce": "0",
            "category": {
                "enum": 2,
                "value": {
                    "enum": 3,
                    "value": {
                        "key": "0000000000000000000000000000000000000000000000000000000000000001",
                        "action": 1,
                    }
                }
            }
        }
    }
}
```

## JSON to base64 XDR

Install [mazzaroth-cli](https://github.com/kochavalabs/mazzaroth-cli)
to easily convert JSON to XDR:

```Bash
npm install -g mazzaroth-cli
```

Convert to base64 XDR:

```Bash
mazzaroth-cli xdr TransactionSubmitRequest '{"transaction": {"signature": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "signer": {}, "action": {"address": "0000000000000000000000000000000000000000000000000000000000000000", "channelID": "0000000000000000000000000000000000000000000000000000000000000000", "nonce": "0", "category": {"enum": 1, "value": { "function": "hello", "parameters": ["Hello World!"]}}}}}'
```

Example Output:

```Bash
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABnN0cmluZwAAAAAAAQAAAARtqx7r
```

## Curl

```Bash
curl --data "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABnN0cmluZwAAAAAAAQAAAARtqx7r" http://localhost:8081/transaction/submit
```

Output:

```Bash
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAKUNvdWxkIG5vdCB2YWxpZGF0ZSBzdWJtaXR0ZWQgdHJhbnNhY3Rpb24uAAAA
```

## Base64 XDR decode

Convert the output to JSON from base64 XDR:

```Bash
mazzaroth-cli xdr -i base64 TransactionSubmitResponse AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAKUNvdWxkIG5vdCB2YWxpZGF0ZSBzdWJtaXR0ZWQgdHJhbnNhY3Rpb24uAAAA
```

output:

```JSON
{
    "transactionID": "0000000000000000000000000000000000000000000000000000000000000000",
    "status": 2,
    "statusInfo": "Could not validate submitted transaction."
}
```
