# Event Tooling

Working with the raw XDR objects, ReceiptSubscription and
ReceiptSubscriptionResult is cumbersome. For this reason, we've provided a
simpler way to subscribe to events and see the results through the
mazzaroth-js and mazzaroth-cli node packages.

## Basic Subscription

Mazzaroth-js exports a [ReceiptSubscribe](https://github.com/kochavalabs/mazzaroth-js/blob/2af0eb869d6727001fae71dde8344e9cdb20c068/src/index.js#L23)
function that utilizes the logic in [BuildReceiptSubscription](https://github.com/kochavalabs/mazzaroth-js/blob/2af0eb869d6727001fae71dde8344e9cdb20c068/src/client/utils.js#L181)
to translate a simpler javascript dictionary into an event subscription. This
helper function is also exposed through the mazzaroth-cli.

For a quick demo similarly to the one shown in the Introduction to events,
first start a mazzaroth node:

```Bash
# Start a mazzaroth standalone node.
docker run -p 8081:8081 kochavalabs/mazzaroth start standalone
```

Next you can subscribe in one of two ways, either through javascript (in the
browser or with nodejs):

```javascript
import { ReceiptSubscribe } from 'mazzaroth-js'

const filter = {}

// To subscribe to only config transactions:
// filter = { transactionFilter: { configFilter: {} } }

ReceiptSubscribe('localhost:8081', filter, result => console.log(result))

/***
Console output for this script after running config transaction:
{
  receipt: {
    status: 1,
    stateRoot: '0c19d830be19fcdd57b50fc35e5c13f3fa2906b0bd68ec7cc8292e1e22ffff2a',
    result: ''
  },
  transactionID: '77c927eb749d541bd7f6e19e2662d4da11ed4355cb75fc71c3e787349dc253db'
}
***/
```

Or through the mazzaroth-cli:

```Bash
npm install -g mazzaroth-cli

# To subscribe to only config transactions:
# mazzaroth-cli subscribe '{ "transactionFilter": { "configFilter": {} } }'
mazzaroth-cli subscribe '{}'

# Result of config execution:
# {
#   receipt: {
#     status: 1,
#     stateRoot: '0c19d830be19fcdd57b50fc35e5c13f3fa2906b0bd68ec7cc8292e1e22ffff2a',
#     result: ''
#   },
#   transactionID: '77c927eb749d541bd7f6e19e2662d4da11ed4355cb75fc71c3e787349dc253db'
# }
```

And finally execute a transaction to see the results via the two event
subscription methods above.

```Bash
# Send a default channel config transaction via mazzaroth-cli deploy.
# More details about submitting transactions can be found in the API-Reference.
echo '{}' | mazzaroth-cli deploy
```
