# Channels

Lookup information about the channel, including the ABI or Contract binary.

- /v1/channels

## Channel Contract

### Contract Request

GET: /v1/channels/{channelID}/contract
Content-Type: application/json  

### Contract Responses

- 200 OK

Response Schema: XDR  
Encoding: base64  
Object: Contract

#### Contract Object

| Field | Value |
|-------|-------|
| owner | string: The 64 character hex representation of a 32 byte Ed25519 public key of the owner for the contract. |
| abi | object: The [ABI Object](#ABI-Object) that defines the functions of the contract. |
| contractBytes | string: Base64 encoded Wasm binary contract to deploy. |
| contractHash  | string: Sha3 256 Hash of the contract bytes, verified on execution. |
| version       | string: The Semver version number of the contract. Must be updated for each unique deploy. |

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.

## Channel ABI

### ABI Request

GET: /v1/channels/{channelID}/abi
Content-Type: application/json  

### ABI Responses

- 200 OK

Response Schema: XDR  
Encoding: base64  
Object: ABI

#### ABI Object

| Field | Value |
|-------|-------|
| version | string: The version of the ABI based on the version of the library used to generate. |
| functions | array of objects: The [Function Signature Objects](#Function-Signature-Object) that make up this ABI. |

##### Function Signature Object

| Field | Value |
|-------|-------|
| functionType | integer: Describes the type of the function (0 = Unknown, 1 = Read, 2 = Write) |
| functionName | string: The name of the function. |
| parameters | array of objects: The [Parameter Objects](#Parameter-Object) that make up the input values to the function. |
| returns | array of objects: The [Parameter Objects](#Parameter-Object) that make up the output values to the function. |

##### Parameter Object

| Field | Value |
|-------|-------|
| parameterName | string: The name of the parameter. |
| parameterType | string: Describes the type of parameter, Examples: uint32, int32, uint64, int64, string, bool, or a custom object |

- 400 Bad Request

Returned when the Request is invalid.

- 500 Internal Server Error

Returned if there is a server error handling the request.
