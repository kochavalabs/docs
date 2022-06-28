"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[205],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),g=l(r),d=o,f=g["".concat(c,".").concat(d)]||g[d]||p[d]||a;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=g;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},9665:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return p}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],s={},c="XDR Codegen",l={unversionedId:"Developer_Tools/XDR_Codegen",id:"Developer_Tools/XDR_Codegen",title:"XDR Codegen",description:"CircleCI",source:"@site/../docs/4-Developer_Tools/6-XDR_Codegen.md",sourceDirName:"4-Developer_Tools",slug:"/Developer_Tools/XDR_Codegen",permalink:"/docs/docs/Developer_Tools/XDR_Codegen",editUrl:"https://github.com/kochavalabs/docs/tree/main/../docs/4-Developer_Tools/6-XDR_Codegen.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Mazzaroth-XDR",permalink:"/docs/docs/Developer_Tools/Mazzaroth_XDR"},next:{title:"XDR JS Serialize",permalink:"/docs/docs/Developer_Tools/XDR_JS_Serialize"}},u={},p=[{value:"Usage",id:"usage",level:2},{value:"License",id:"license",level:2}],g={toc:p};function d(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},g,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"xdr-codegen"},"XDR Codegen"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://circleci.com/gh/kochavalabs/xdr-codegen"},(0,a.kt)("img",{parentName:"a",src:"https://circleci.com/gh/kochavalabs/xdr-codegen.svg?style=svg",alt:"CircleCI"}))),(0,a.kt)("p",null,"Xdr-codegen is a binary that is used to take the ",(0,a.kt)("a",{parentName:"p",href:"https://tools.ietf.org/html/rfc4506#section-6"},"XDR Language Specification"),"\nand generate source code in various languages. The goal of this is to facilitate\nthe communication of XDR objects across binaries that are written in different\nlanguages. Another way to say this is we take .x files and convert them to the\nappropriate js, go or rust source (protoc for XDR)."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Warning:")," This project was put together to aid us in our development in a\nshort amount of time. There is still more work to be done before xdr-codegen\nis completely compatible with the ",(0,a.kt)("a",{parentName:"p",href:"https://tools.ietf.org/html/rfc4506#section-6"},"XDR Language Specification"),"."),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"We currently support code generation for 3 languages: javascript, rust and go.\nThe generated code has the following dependencies:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"go: ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/stellar/go-xdr"},"go-xdr")),(0,a.kt)("li",{parentName:"ul"},"rust: ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/kochavalabs/xdr-rs-serialize"},"xdr-rs-serialize")),(0,a.kt)("li",{parentName:"ul"},"javascript: ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/kochavalabs/xdr-js-serialize"},"xdr-js-serialize"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"# Javascript generation\ncargo run test.x --language js # | eslint --stdin\n# Rust generation\ncargo run test.x --language rust # | rustfmt\n# Go generation\ncargo run test.x --language go # | gofmt\n# Commonjs generation\ncargo run test.x --language commonjs # | eslint --stdin\n")),(0,a.kt)("h2",{id:"license"},"License"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://choosealicense.com/licenses/mit/"},"MIT")))}d.isMDXComponent=!0}}]);