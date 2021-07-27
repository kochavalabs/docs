# Event Subscription

A Mazzaroth node gives users the ability to subscribe to events. We will be
using the term event in documentation, but it is important to know what is
actually being subscribed to, transaction receipts. More specifically,
you can subscribe to either a Readonly or Standalone node to receive receipts
that are the result of executed transactions.

## How to Subscribe

An event subscription is initialized by establishing a websocket connection with
a node and sending a [ReceiptSubscription](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/subscribe.x#L3)
across the websocket connection. You then will receive the results back via the
same websocket connection in the form of [ReceiptSubscriptionResult](https://github.com/kochavalabs/mazzaroth-xdr/blob/master/idl/subscribe.x#L10)
that match your subscription. As part of the ReceiptSubscription you can filter
which results you receive on several fields and we provide tools to make this
process easier. This will be covered more thoroughly in later sections
[tools](https://mazzaroth.io/docs/4-Event_Subscription/3-Tools.md)/
[filtering](https://mazzaroth.io/docs/4-Event_Subscription/2-Specifying_Filters.md).

## Basic Subscription

To demonstrate a basic event subscription we will utilize the [wscat](https://github.com/websockets/wscat).
You will also need to have docker installed to run a Mazzaroth node. First
install the necessary tools and start a Mazzaroth node:

```Bash
# Install wscat to help with websocket communication
npm install -g wscat

# Install the Mazzaroth CLI to help with XDR translation
npm install -g mazzaroth-cli

# Start a mazzaroth standalone node.
docker run -p 8081:8081 kochavalabs/mazzaroth start standalone
```

Next in a separate terminal we can subscribe to receipts produced by the node
that we just started.

```Bash
# Use mazzaroth-cli to get the correct XDR for an empty subscription. Any empty
# subscription will return all receipts without any filtering.

mazzaroth-cli xdr ReceiptSubscription '{}'
# Base64 Result: AAAAAAAAAAA=

wscat -c ws://localhost:8081/subscribe/receipt
Connected (press CTRL+C to quit)
> AAAAAAAAAAA=
< AAAAAQwZ2DC+GfzdV7UPw15cE/P6KQawvWjsfMgpLh4i//8qAAAAAHfJJ+t0nVQb1/bhniZi1NoR7UNVy3X8ccPnhzSdwlPb

```

And finally submit a basic transaction to see the result come through for the
subscription.

```Bash
# Send a default channel config transaction via mazzaroth-cli deploy.
# More details about submitting transactions can be found in the API-Reference.
echo '{}' | mazzaroth-cli deploy

# Interpret the result of the subscription received across wscat
mazzaroth-cli xdr ReceiptSubscriptionResult --inputType base64 AAAAAQwZ2DC+GfzdV7UPw15cE/P6KQawvWjsfMgpLh4i//8qAAAAAHfJJ+t0nVQb1/bhniZi1NoR7UNVy3X8ccPnhzSdwlPb

# {
#   "receipt": {
#     "status": 1,
#     "stateRoot": "0c19d830be19fcdd57b50fc35e5c13f3fa2906b0bd68ec7cc8292e1e22ffff2a",
#     "result": ""
#   },
#   "transactionID": "77c927eb749d541bd7f6e19e2662d4da11ed4355cb75fc71c3e787349dc253db"
# }
```
