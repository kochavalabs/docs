(self.webpackChunk=self.webpackChunk||[]).push([[570],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return h},kt:function(){return p}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},h=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),u=c(n),p=r,f=u["".concat(l,".").concat(p)]||u[p]||d[p]||i;return n?a.createElement(f,o(o({ref:t},h),{},{components:n})):a.createElement(f,o({ref:t},h))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6300:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var a=n(7462),r=n(3366),i=n(7294),o=n(6010),s=n(2125),l=(n(1793),n(2933)),c=n(9009),h=n(8084);function d(e){var t=(0,h.useAllPluginInstancesData)("docusaurus-plugin-redoc");return e?t[e]:Object.values(t)[0]}var u=["id","example","pointer"],p=function(e){var t=e.id,n=e.example,h=e.pointer,p=(0,r.Z)(e,u),f=d(t),b=(0,c.U)(f),k=b.store,y=b.darkStore,m=b.lightStore;return(0,i.useEffect)((function(){m.menu.dispose(),y.menu.dispose()}),[m,y]),i.createElement(s.ThemeProvider,{theme:k.options.theme},i.createElement("div",{className:(0,o.Z)(["redocusaurus","redocusaurus-schema",n?null:"hide-example"])},i.createElement(l.SchemaDefinition,(0,a.Z)({parser:k.spec.parser,options:k.options,schemaRef:h},p))))};p.defaultProps={example:!1};var f=p},1362:function(e,t,n){"use strict";n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return l},metadata:function(){return h},toc:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=n(6300),s=["components"],l={},c="Storage",h={unversionedId:"Architecture/Storage",id:"Architecture/Storage",title:"Storage",description:"Data is stored by Mazzaroth in a couple of ways. The Mazzaroth Ledger",source:"@site/../docs/3-Architecture/5-Storage.md",sourceDirName:"3-Architecture",slug:"/Architecture/Storage",permalink:"/docs/docs/Architecture/Storage",editUrl:"https://github.com/kochavalabs/docs/tree/main/../docs/3-Architecture/5-Storage.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"WebAssembly",permalink:"/docs/docs/Architecture/WebAssembly"},next:{title:"Data Structures",permalink:"/docs/docs/Architecture/Data_Structures"}},d={},u=[{value:"Key Value Store",id:"key-value-store",level:2},{value:"Merkle Tree",id:"merkle-tree",level:2},{value:"RothVM StateDB",id:"rothvm-statedb",level:2},{value:"RothVM StateDB Prefixes",id:"rothvm-statedb-prefixes",level:3},{value:"Contract Key",id:"contract-key",level:4},{value:"State Prefix",id:"state-prefix",level:4},{value:"SQL Dialect",id:"sql-dialect",level:3},{value:"Ledger Database",id:"ledger-database",level:2},{value:"Ledger Prefixes",id:"ledger-prefixes",level:3},{value:"Transaction Prefix",id:"transaction-prefix",level:4},{value:"Transaction Block Lookup Prefix",id:"transaction-block-lookup-prefix",level:4},{value:"Header Number Prefix",id:"header-number-prefix",level:4},{value:"Header Store Prefix",id:"header-store-prefix",level:4},{value:"Receipt Hash Prefix",id:"receipt-hash-prefix",level:4},{value:"Receipt Prefix",id:"receipt-prefix",level:4}],p={toc:u};function f(e){var t=e.components,n=(0,r.Z)(e,s);return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"storage"},"Storage"),(0,i.kt)("p",null,"Data is stored by Mazzaroth in a couple of ways. The Mazzaroth Ledger\nkeeps a persistent copy of blocks and transactions that are accepted into\nthe blockchain. The Mazzaroth Virtual Machine (RothVM) also contains a\nState Database that tracks metadata about a channel and is used for contract\nstorage."),(0,i.kt)("h2",{id:"key-value-store"},"Key Value Store"),(0,i.kt)("p",null,"The underlying data storage for the state databases in Mazzaroth is a\nKey-Value store. This includes the Ledger DB, which stores all blocks\nand transactions on the blockchain and the RothVM StateDB, which includes state\ndata for the channel and contract."),(0,i.kt)("p",null,"Using a Key-Value Stores give a lot of flexibility as any object can be stored\nas the value to a key. For example, we use a Key-Value Store to contain the data\nof a ",(0,i.kt)("a",{parentName:"p",href:"#Merkle-Tree"},"Merkle Tree")," that represents all of the state data in the\nRothVM making it easier to authenticate. We can also use the Key-Value Store\nto store data for access using ",(0,i.kt)("a",{parentName:"p",href:"#SQL-Dialect"},"SQL Dialect")," which is a very useful\nfeature that can be provided to contracts storing data on Mazzaroth."),(0,i.kt)("p",null,"The following interface defines how the Mazzaroth KVStore can be used:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-Golang"},"type KeyValue struct {\n    Key   []byte\n    Value []byte\n}\n\ntype Store interface {\n    Delete(key []byte) error\n    Get(key []byte) ([]byte, error)\n    Set(key []byte, value []byte) error\n\n    // Scan Scans across a key range from start (inclusive) to end (exclusive)\n    // in descending order ( 'a' -> 'b' -> 'c' )\n    // sending any results down the returned channel.\n    Scan(start []byte, end []byte) chan KeyValue\n\n    // ReverseScan Scans across a key range from start (inclusive) to end\n    // (exclusive) in ascending order ( 'c' -> 'b' -> 'a' ) sending any results\n    // down the returned channel.\n    ReverseScan(start []byte, end []byte) chan KeyValue\n\n    // NextSequence returns a monotonically increasing integer.\n    // Multiple sequences can be created by providing different keys.\n    // New Sequences start at 0\n    NextSequence(key []byte) (uint64, error)\n\n    Close() error\n}\n")),(0,i.kt)("p",null,"Mazzaroth currently uses ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/dgraph-io/badger"},"Badger")," as its\nunderlying Persistent KVStore."),(0,i.kt)("h2",{id:"merkle-tree"},"Merkle Tree"),(0,i.kt)("p",null,"A Merkle Tree is a tree in which every every leaf node may be represented by a\ncryptographic hash and every non-leaf is labelled with the cryptographic hash\nof its child nodes. The benefit of using a Merkle Tree is that it provides\nefficient and secure verification of the data that it stores."),(0,i.kt)("p",null,"For an example of how this is used in Mazzaroth take a look at the fields of a\nBlock Header."),(0,i.kt)(o.Z,{pointer:"#/definitions/BlockHeader",mdxType:"ApiSchema"}),(0,i.kt)("p",null,"Every Block Header contains three Merkle Root Hashes, which correspond to the\nTransaction Merkle Tree, the Receipt Merkle Tree, and the State DB Merkle Tree."),(0,i.kt)("p",null,"Mazzaroth has two implementations of Merkle Trie's, a Sparse and Radix type with\nRadix being the default option as it is a space-optimized implementation."),(0,i.kt)("p",null,"The Mazzaroth MerkleTrie interface embeds the KVStore with additional functionality\nfor getting Merkle Roots and paths:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-Golang"},"type Trie interface {\n    kvstore.Store\n\n    // Get a key, if it exists return the value and path for\n    GetPath(k []byte) ([]byte, *Path, error)\n    // GetRoot of the trie\n    GetRoot() ([]byte, error)\n    // SetRoot of the trie\n    SetRoot([]byte) error\n}\n\ntype MerkleTrie struct {\n    trie Trie\n}\n")),(0,i.kt)("h2",{id:"rothvm-statedb"},"RothVM StateDB"),(0,i.kt)("p",null,"The Mazzaroth Virtual Machine (RothVM) contains a State Database which stores\nmetadata for a channel as well as the state data for a smart contract deployed\nto the channel."),(0,i.kt)("h3",{id:"rothvm-statedb-prefixes"},"RothVM StateDB Prefixes"),(0,i.kt)("p",null,"Key collisions are prevented by using a reserved set of prefixes and unique keys\nfor data within the State Database."),(0,i.kt)("h4",{id:"contract-key"},"Contract Key"),(0,i.kt)("p",null,"The Contract Key is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("d_")')," and is used to store the Contract as bytes."),(0,i.kt)("h4",{id:"state-prefix"},"State Prefix"),(0,i.kt)("p",null,"The State Prefix is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("s_")')," and is used to prefix all keys used by the contract's\ninternal storage."),(0,i.kt)("p",null,"For example, if a contract uses the host ",(0,i.kt)("inlineCode",{parentName:"p"},"Set")," external function it will store a\nvalue in the RothVM StateDB by combining the State Prefix with the given key.\nSee ",(0,i.kt)("a",{parentName:"p",href:"https://mazzaroth.io/docs/5-Architecture/4-WebAssembly.md"},"WebAssembly doc"),"/\nfor info about the System interface function."),(0,i.kt)("h3",{id:"sql-dialect"},"SQL Dialect"),(0,i.kt)("p",null,"Since the State Database is just a Key-Value store it is very simple for a contract\nto access data by storing and retrieving using keys. This however, does have some\nlimitations. For contracts that store a lot of objects if they want to retrieve\nobjects that contain a particular field they would have to perform many separate\nretrieve calls and manually check the objects to filter. This is a very inefficient\nway to access data and would result in very long running function calls in contracts\nthat do this type of operation."),(0,i.kt)("p",null,"To improve this we have added an SQL driver built on top of the Key-Value Store data\nwithin the RothVM State Database. The data can be inserted and queried using traditional\nSQL Dialect directly from the contract. This is currently done by implementing the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/genjidb/genji/blob/v0.10.0/engine/engine.go"},"Genji Engine")," interface\non top of the RothVM State Database."),(0,i.kt)("p",null,"The RothVM System Interface provides functions to execute and insert into the State\nDatabase. See the ",(0,i.kt)("a",{parentName:"p",href:"https://mazzaroth.io/docs/5-Architecture/4-WebAssembly.md"},"WebAssembly"),"\ndocumentation for a full list of the System Interface functions. These can be used\nwithin contracts by importing the Mazzaroth library. An example of\nfunction calls using Rust with the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kochavalabs/mazzaroth-rs"},"mazzaroth-rs"),"\nlibrary are provided below."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-Rust"},'// The mazzaroth_rs external sql module provides the System Interface functions.\nuse mazzaroth_rs::external::sql;\n\n// Use exec to execute a CREATE TABLE statement\nmatch sql::exec("CREATE TABLE foo;") {\n    Some(_) => panic!("Error creating table"),\n    None => {}\n};\n\n// Use insert to add an object to a specified table\nsql::insert("foo".to_string(), "{\'id\': \'bar\'}").unwrap();\n\n// Use exec to query data from a table\nsql::exec("SELECT * FROM foo WHERE id = \'bar\'")\n')),(0,i.kt)("h2",{id:"ledger-database"},"Ledger Database"),(0,i.kt)("p",null,"The Mazzaroth Ledger is a Database which stores ledger information including\ntransactions, receipts, and blocks that have been processed by a Mazzaroth network.\nTransactions and receipts are committed to the ledger, which can be finalized with\nmultiple transactions into a block."),(0,i.kt)("p",null,"The Ledger also includes functions that allow retrieving data or getting information\nabout the existing state of the ledger."),(0,i.kt)("p",null,"The following interface defines the current functionality of the ledger:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-Golang"},"type Ledger interface {\n    Commit(tx xdr.Transaction, receipt xdr.Receipt) (xdr.Hash, error)\n\n    // Get a transaction by its id\n    GetTransaction(transactionID []byte) (xdr.Transaction, error)\n\n    // Gets the latest committed transaction\n    GetLatestTransaction() (xdr.Transaction, error)\n\n    // Get transactions committed, but not yet finalized to a block\n    GetPendingTransactions() []xdr.Transaction\n\n    // HasPendingTransactions whether there are pending transactions in the ledger\n    HasPendingTransactions() bool\n\n    // Get a Transaction Receipt by transaction id\n    GetReceipt(transactionID []byte) (xdr.Receipt, error)\n\n    // GetBlock returns a block by hash id\n    GetBlock(id []byte) (xdr.Block, error)\n    // GetBlockByHeight returns a block by idx ( id is the integer index a.k.a the block height)\n    GetBlockByHeight(idx uint64) (xdr.Block, error)\n    // GetBlockHeaderByHeight returns the block header by the block height\n    GetBlockHeaderByHeight(idx uint64) (xdr.BlockHeader, error)\n    // GetBlockHeader returns the block header for the given header hash\n    GetBlockHeader(id []byte) (xdr.BlockHeader, error)\n    // FinalizeBlock will commit the current block as final and start a new block, returning the blockId and block height\n    FinalizeBlock(consensusSeqNumber uint64) (*xdr.Block, error)\n\n    // RevertToBlock will remove all pending transactions and blocks to return to the specified stable block\n    RevertToBlock(height uint64) error\n\n    // GetLedgerID returns a ID of a ledger - For now this will be the hash of the genesis block\n    GetLedgerID() string\n    // VerifyLedger will walk through the chain and verify that the local DB is not corrupted (VERY LONG RUNNING)\n    VerifyLedger() error\n    // Close connections\n    Close() error\n\n    // Get the current block height\n    CurrentBlockHeight() uint64\n\n    // Get current ledger state\n    GetCurrentLedgerState() xdr.StateStatus\n\n    IsEmpty() bool\n}\n")),(0,i.kt)("h3",{id:"ledger-prefixes"},"Ledger Prefixes"),(0,i.kt)("p",null,"Key collisions are prevented by using a reserved set of prefixes and unique keys\nfor data within the State Database."),(0,i.kt)("h4",{id:"transaction-prefix"},"Transaction Prefix"),(0,i.kt)("p",null,"The Transaction prefix is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("t")')," and is used to prefix block height and\ntransaction count with the transaction ids to the transaction object in the store."),(0,i.kt)("p",null,'For example, a transaction with id "aaa" as the second transaction in block 1\nwould be stored with the following prefixes applied:\n',(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("t") + [8]byte(1) + [8]byte(2) + []byte("aaa")')),(0,i.kt)("p",null,"Note: The block height and transaction height are encoded as Big Endian uint64s\nand the transaction id is a Sha3_256 hash of the transaction object, not shown in\nthe example for simplicity."),(0,i.kt)("p",null,"The benefit of prefixing with block height in this order is that it is possible\nto find all transactions for a block by scanning over the keys with just the\nTransaction prefix and block number."),(0,i.kt)("h4",{id:"transaction-block-lookup-prefix"},"Transaction Block Lookup Prefix"),(0,i.kt)("p",null,"The Transaction Block Lookup prefix is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("x")')," and is used to prefix\ntransaction ids to the block height in the store. To get a transaction from\nthe ledger this prefix is used to lookup the block height to be used to get\nthe block object which contains the transaction."),(0,i.kt)("h4",{id:"header-number-prefix"},"Header Number Prefix"),(0,i.kt)("p",null,"The Header Number prefix is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("n")')," and is used to prefix block header\nhash to the block height. This can be used to lookup a block by its header\nid."),(0,i.kt)("h4",{id:"header-store-prefix"},"Header Store Prefix"),(0,i.kt)("p",null,"The Header Store prefix is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("h")')," and is used to prefix block height\nto the block header object. Block height is a Big Endian encoded uint64."),(0,i.kt)("h4",{id:"receipt-hash-prefix"},"Receipt Hash Prefix"),(0,i.kt)("p",null,"The Receipt Hash prefix is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("r")')," and is used to prefix transaction id\nto the receipt hash id.  This can be used to lookup a receipt by transaction id."),(0,i.kt)("h4",{id:"receipt-prefix"},"Receipt Prefix"),(0,i.kt)("p",null,"The Receipt prefix is ",(0,i.kt)("inlineCode",{parentName:"p"},'[]byte("p")')," and is used to prefix receipt\nhash to the receipt object."))}f.isMDXComponent=!0},5101:function(){},2116:function(){},3197:function(){}}]);