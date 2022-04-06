"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[780],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),f=a,h=d["".concat(s,".").concat(f)]||d[f]||p[f]||o;return n?r.createElement(h,i(i({ref:t},l),{},{components:n})):r.createElement(h,i({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2557:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return p}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],c={sidebar_label:"Account Creation",sidebar_position:2},s="Creating Mazzaroth Accounts",u={unversionedId:"Account_Creation",id:"Account_Creation",title:"Creating Mazzaroth Accounts",description:"All transactions that are submitted to the network will be signed by a private",source:"@site/../docs/2-Account_Creation.md",sourceDirName:".",slug:"/Account_Creation",permalink:"/docs/docs/Account_Creation",editUrl:"https://github.com/kochavalabs/docs/tree/main/../docs/2-Account_Creation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Account Creation",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/docs/Getting_Started"},next:{title:"Deterministic Logic",permalink:"/docs/docs/Architecture/Deterministic_Logic"}},l={},p=[{value:"Generating a key pair",id:"generating-a-key-pair",level:2}],d={toc:p};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"creating-mazzaroth-accounts"},"Creating Mazzaroth Accounts"),(0,o.kt)("p",null,"All transactions that are submitted to the network will be signed by a private\nkey and contain the sender's public key address for authentication and for use\nin contracts that depend on the identity of the sender."),(0,o.kt)("p",null,"A Mazzaroth account can be created by generating an\n",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/EdDSA#Ed25519"},"Ed25519")," key pair."),(0,o.kt)("p",null,"The private key should be kept secret and is used to sign transactions to\nprove that you are the sender."),(0,o.kt)("p",null,"The public key is used as your public address id within Mazzaroth and is visible\nto others."),(0,o.kt)("p",null,"The same keys can be used in any Mazzaroth channel including development\nnetworks or public networks. So never share the private key used even for\ndevelopment if you plan on using the same key pair for a public network."),(0,o.kt)("h2",{id:"generating-a-key-pair"},"Generating a key pair"),(0,o.kt)("p",null,"You can use openssl version 1.1 or higher to generate a private key based on\nthe ed25519 Curve:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-Bash"},"openssl genpkey -algorithm ed25519 -outform PEM -out ed25519key.pem\n")),(0,o.kt)("p",null,"This outputs a pem file, which can be useful for those that are already familiar\nwith the format. PEM files are a bit more difficult to deal with though, so\nwe've also published a wallet application to docker that can be used to output\na key pair."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-Bash"},"docker run kochavalabs/mazzaroth-wallet generate-keys\n")))}f.isMDXComponent=!0}}]);