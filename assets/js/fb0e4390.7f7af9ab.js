"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[213],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return h}});var o=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,o,a=function(t,e){if(null==t)return{};var n,o,a={},r=Object.keys(t);for(o=0;o<r.length;o++)n=r[o],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(o=0;o<r.length;o++)n=r[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var s=o.createContext({}),c=function(t){var e=o.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=c(t.components);return o.createElement(s.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},p=o.forwardRef((function(t,e){var n=t.components,a=t.mdxType,r=t.originalType,s=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),p=c(n),h=a,m=p["".concat(s,".").concat(h)]||p[h]||d[h]||r;return n?o.createElement(m,i(i({ref:e},u),{},{components:n})):o.createElement(m,i({ref:e},u))}));function h(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var r=n.length,i=new Array(r);i[0]=p;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=t,l.mdxType="string"==typeof t?t:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6415:function(t,e,n){n.r(e),n.d(e,{assets:function(){return u},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return d}});var o=n(7462),a=n(3366),r=(n(7294),n(3905)),i=["components"],l={},s="Mazzaroth Studio",c={unversionedId:"Developer_Tools/Mazzaroth_Studio",id:"Developer_Tools/Mazzaroth_Studio",title:"Mazzaroth Studio",description:"Mazzaroth Studio is an online",source:"@site/../docs/4-Developer_Tools/2-Mazzaroth_Studio.md",sourceDirName:"4-Developer_Tools",slug:"/Developer_Tools/Mazzaroth_Studio",permalink:"/docs/docs/Developer_Tools/Mazzaroth_Studio",editUrl:"https://github.com/kochavalabs/docs/tree/main/../docs/4-Developer_Tools/2-Mazzaroth_Studio.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"m8",permalink:"/docs/docs/Developer_Tools/M8"},next:{title:"Mazzaroth-js",permalink:"/docs/docs/Developer_Tools/Mazzaroth_JS"}},u={},d=[{value:"Quick Start",id:"quick-start",level:2},{value:"Key Features",id:"key-features",level:2},{value:"Rust Template Contracts",id:"rust-template-contracts",level:3},{value:"Hello World",id:"hello-world",level:4},{value:"New Contract",id:"new-contract",level:4},{value:"Simple Token",id:"simple-token",level:4},{value:"Building the Contract",id:"building-the-contract",level:3},{value:"Downloadable Files",id:"downloadable-files",level:3}],p={toc:d};function h(t){var e=t.components,n=(0,a.Z)(t,i);return(0,r.kt)("wrapper",(0,o.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"mazzaroth-studio"},"Mazzaroth Studio"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://studio.mazzaroth.io/"},"Mazzaroth Studio")," is an online\nIDE (Integrated Development Environment) that helps teach\nhow to write Mazzaroth Smart contracts.\nIt provides tools to compile the contract into a WebAssembly (WASM)\nbinary, deploy to a Mazzaroth Node, and submit transactions\nto call functions on a deployed contract."),(0,r.kt)("h2",{id:"quick-start"},"Quick Start"),(0,r.kt)("p",null,"To get started visit ",(0,r.kt)("a",{parentName:"p",href:"https://studio.mazzaroth.io/"},"Mazzaroth Studio")," and\nsign in with one of the supported providers (GitHub, GitLab, or Google).\nSelect one of the templates (Hello World, New Contract, or Simple Token) to\ncreate the initial project files. Click ",(0,r.kt)("inlineCode",{parentName:"p"},"Build")," to compile the contract into\na contract.wasm WebAssembly binary and generate the abi.json."),(0,r.kt)("p",null,"In order to use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Deploy")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Run")," features you must be running a Mazzaroth\nNode locally or have the address of a node that you can interact with."),(0,r.kt)("p",null,"With Docker you can start a Mazzaroth Standalone Node for testing. Use the following\ncommand to start a Standalone node with port 6299 open for HTTP Access."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-Bash"},"docker run -p 6299:6299 kochavalabs/mazzaroth:latest node start standalone\n")),(0,r.kt)("p",null,"With a Node running you may use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Deploy")," button to send a Contract Update Transaction\nthat contains the compiled contract.wasm binary. Make sure that the Node Address\nfield is set to the location of the running Mazzaroth Node. You may leave the\nother fields at default values for testing."),(0,r.kt)("p",null,"After doing a ",(0,r.kt)("inlineCode",{parentName:"p"},"Deploy")," you can use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Run")," button to send a Call Transaction to\nexecute a function on the Node with the deployed contract. This dialog will let\nyou select the function to call based on the abi.json from the compiled contract.\nSimply select a function and enter values for the arguments then press Run. The\noutput of the function call should appear in the bottom right corner."),(0,r.kt)("h2",{id:"key-features"},"Key Features"),(0,r.kt)("h3",{id:"rust-template-contracts"},"Rust Template Contracts"),(0,r.kt)("p",null,"Mazzaroth Studio provides three basic templates to start projects from:\n",(0,r.kt)("a",{parentName:"p",href:"#Hello-World"},"Hello World"),", ",(0,r.kt)("a",{parentName:"p",href:"#New-Contract"},"New Contract"),", and ",(0,r.kt)("a",{parentName:"p",href:"#Simple-Token"},"Simple Token"),"."),(0,r.kt)("h4",{id:"hello-world"},"Hello World"),(0,r.kt)("p",null,"The Hello World contract is a smart contract template demonstrating a few basic\nfeatures of Mazzaroth smart contracts. This is a good contract to start with to\nget an idea of what a minimal smart contract looks like while still providing some\nfunctionality. The contract has one readonly function which takes a string and\nreturns a string. The function ",(0,r.kt)("inlineCode",{parentName:"p"},"hello")," logs a message to the Mazzaroth Node\nand outputs Hello World as a return from the function."),(0,r.kt)("h4",{id:"new-contract"},"New Contract"),(0,r.kt)("p",null,"New Contract is a smart contract template that provides a minimal set of required\nfunctions. This template is useful if you want to create your own contract and\ndon't need to see other examples. It provides the main function needed to\nexecute on the Mazzaroth Virtual Machine and a couple empty functions."),(0,r.kt)("h4",{id:"simple-token"},"Simple Token"),(0,r.kt)("p",null,"The Simple Token Contract is an example token implementation that includes functions\nshowing how tokens can be transferred between addresses.\nThis is similar to what you would find in EOS and Ethereum.\nThis is a good contract to check out some of the more advanced features necessary\nto write a useful Mazzaroth Contract. When deployed you can use this contract to\ninitialize a balance of tokens to an address and freely transfer tokens between\naddresses as well as check the token balance or total supply at any time."),(0,r.kt)("p",null,"This template is meant for testing purposes only. It is missing some important features\nthat would be needed for a real token contract, such as not allowing multiple initializations\nor only allowing account holders to transfer from their own account."),(0,r.kt)("h3",{id:"building-the-contract"},"Building the Contract"),(0,r.kt)("p",null,"The Build function currently works by sending the source files to a backend server\nwhich does a Cargo build to produce the contract.wasm binary and abi.json file.\nThe benefit of this is that contracts can be built by new users without a Rust\ntoolchain."),(0,r.kt)("p",null,"For those more familiar with Rust you can do the same thing by downloading\nthe source files, adding a Cargo.toml, and running a Cargo build targeting\nwasm32-unknown-unknown. The three Mazzaroth Rust libraries that are used to\nhelp compile Rust contracts are available on Crates.io:"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://crates.io/crates/mazzaroth-xdr"},"mazzaroth-xdr")," - Contains the XDR objects\nused by Mazzaroth.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("a",{parentName:"p",href:"https://crates.io/crates/mazzaroth-rs"},"mazzaroth-rs")," - Includes host bindings needed\nto compile for Mazzaroth VM and provides many useful functions for contracts.",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("a",{parentName:"p",href:"https://crates.io/crates/mazzaroth-rs-derive"},"mazzaroth-rs-derive")," - Provides the\nmacros to derive the mazzaroth contract abi for a contract."),(0,r.kt)("h3",{id:"downloadable-files"},"Downloadable Files"),(0,r.kt)("p",null,"The Download button will download a zip of all of the files in the project\ndirectory on the left. This can be used to download the source files for a\nparticular template as well as the target files that are created by doing a\nbuild. You can also right click on any file to download a copy of just that\nparticular file."))}h.isMDXComponent=!0}}]);