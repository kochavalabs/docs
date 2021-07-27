# Block Header Object

| Field | Value |
|-------|-------|
| timestamp | string: The timestamp applied to this Block. |
| blockHeight | string: The height of this block in the ledger, which starts at block height 0. |
| transactionHeight | string: The highest transaction number stored in this block. |
| consensusSequenceNumber | string: The ending consensus sequence number for commits in this block. |
| txMerkleRoot | string: The 64 character hex hash transaction merkle root. |
| txReceiptRoot | string: The 64 character hex hash receipt merkle root. |
| stateRoot | string: The 64 character hex hash of the state DB root. |
| previousHeader | string: The 64 character hex hash of the previous block header. |
| blockProducerAddress | string: The 64 character hex ID of the Consensus leader that produced the block. |
