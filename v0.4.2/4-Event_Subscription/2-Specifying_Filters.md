# Event Filters

When subscribing to an event, you send a [ReceiptSubscription](#ReceiptSubscription)
across the websocket connection created with the node. This object is designed
to allow you to filter which events you will receive based on either the
transaction or the receipt associated with the event.

## ReceiptSubscription Object

The [ReceiptSubscription](#ReceiptSubscription) object is an XDR object that is
composed of various unions. This is because each of the values you can filter on
is optional. In the end a [ReceiptSubscription](#ReceiptSubscription) is a
collection of optional [ValueFilters](#ValueFilter) that allow you to specify
which events you would like to receive.

The raw form filters are cumbersome so we've simplified this with mazzaroth-js.
Below are two examples of the javascript representation of the raw filters for
reference:

```javascript
// Filter to receive events for every transaction
const callFilter = {
  receiptFilter: { enum: 0, value: '' },
  transactionFilter: { enum: 0, value: '' },
}

// Filter to receive events for transactions with a failed receipt status
const callFilter = {
  receiptFilter: {
    enum: 1,
    value: {
      status: {
        enum: 5,
        value: '0'
      },
      stateRoot: {
        enum: 0,
        value: ''
      }
    }
  },
  transactionFilter: { enum: 0, value: ''}
}

```

A full breakdown of what's contained in a receipt subscription:

## ReceiptSubscription

|Field|Value|
|-----|-----|
| TransactionFilter | union: The [TransactionFilter union](#TransactionFilter) |
| ReceiptFilter | union: The [ReceiptFilter union](#ReceiptFilter) |

## TransactionFilter

|Field|Value|
|-----|-----|
| NONE | void: Leave as NONE if you want events for all Transactions |
| GENERIC | [ActionFilter](#ActionFilter): Filters based on properties common to all transactions |
| CONTRACT | [ContractFilter](#ContractFilter): Filters to contract update transactions |
| CONFIG | [ConfigFilter](#ConfigFilter):  Filters to config update transactions |
| PERMISSION | [PermissionFilter](#PermissionFilter): Filters to permission update transactions |
| CALL | [CallFilter](#CallFilter): Filters to call transactions |

## ActionFilter

|Field|Value|
|-----|-----|
| signature | [ValueFilter](#ValueFilter): HASH64 to match against transaction signature |
| signer | [ValueFilter](#ValueFilter): HASH32 to match against transaction signer |
| address | [ValueFilter](#ValueFilter): HASH32 to match against transaction sender address |
| channelID | [ValueFilter](#ValueFilter): HASH32 to match against channelID |
| nonce | [ValueFilter](#ValueFilter): UHYPER to match against transaction nonce |

## ContractFilter

|Field|Value|
|-----|-----|
| actionFilter | [ActionFilter](#ActionFilter): Object to match against generic transaction properties |
| version | [ValueFilter](#ValueFilter): STRING regex to match against the contract version |

## ConfigFilter

|Field|Value|
|-----|-----|
| actionFilter | [ActionFilter](#ActionFilter): Object to match against generic transaction properties |

## PermissionFilter

|Field|Value|
|-----|-----|
| actionFilter | [ActionFilter](#ActionFilter): Object to match against generic transaction properties |
| key | [ValueFilter](#ValueFilter): Hash32 to match against the key having permissions updated |
| action | [ValueFilter](#ValueFilter): INT representing the type of permission action to filter on |

## CallFilter

|Field|Value|
|-----|-----|
| actionFilter | [ActionFilter](#ActionFilter): Object to match against generic transaction properties |
| function | [ValueFilter](#ValueFilter): STRING regex to match against the function being called |

## ReceiptFilter

|Field|Value|
|-----|-----|
| NONE | void: Leave as NONE if you want events for all receipt values |
| RECEIPT | [ReceiptValueFilter](#ReceiptValueFilter): Object to match against specific receipt values |

## ReceiptValueFilter

|Field|Value|
|-----|-----|
| status | [ValueFilter](#ValueFilter): INT to match against ReceiptStatus (0=Success, 1=Failure) |
| stateRoot | [ValueFilter](#ValueFilter): HASH32 to match against the state root at the time of the event|

## ValueFilter

|Field|Value|
|-----|-----|
| NONE | void: Leave as NONE if you want events for all values |
| STRING | string: A regex following the [golang re2](https://github.com/google/re2/wiki/Syntax) rules, if matched you get the event |
| HASH32 | Hash32: 32 byte hash value, must match exactly to receive the event |
| HASH64 | Hash64: 64 byte hash value, must match exactly to receive the event |
| UHYPER | unsigned hyper: 64 bit unsigned integer, must match exactly to receive the event |
| INT | int: 32 bit integer, must match exactly to receive the event. Used to match enums as well |
