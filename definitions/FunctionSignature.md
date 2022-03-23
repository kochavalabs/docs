## Function Signature Object

| Field | Value |
|-------|-------|
| functionType | integer: Describes the type of the function (0 = Unknown, 1 = Read, 2 = Write) |
| functionName | string: The name of the function. |
| parameters | array of objects: The [Parameter Objects](#Parameter-Object) that make up the input values to the function. |
| returns | array of objects: The [Parameter Objects](#Parameter-Object) that make up the output values to the function. |

!INCLUDE "Parameter.md"
