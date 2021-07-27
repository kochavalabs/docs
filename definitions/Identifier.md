# Identifier Object

| Field | Value |
|-------|-------|
| enum | integer: Describes which type of identifier is contained in the value field (0 = None, 1 = Number, 2 = Hash) |
| value | string: If using Number identifier then it is the string number, i.e. "1", else if Hash must be the 64 character hex block header hash. |
