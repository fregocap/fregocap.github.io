import{r as x}from"./index.WFquGv8Z.js";var c={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function p(){if(d)return n;d=1;var l=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function a(s,t,e){var r=null;if(e!==void 0&&(r=""+e),t.key!==void 0&&(r=""+t.key),"key"in t){e={};for(var u in t)u!=="key"&&(e[u]=t[u])}else e=t;return t=e.ref,{$$typeof:l,type:s,key:r,ref:t!==void 0?t:null,props:e}}return n.Fragment=i,n.jsx=a,n.jsxs=a,n}var f;function v(){return f||(f=1,c.exports=p()),c.exports}var o=v();const h=({headings:l=[]})=>{const[i,a]=x.useState(""),s=l.filter(t=>t.depth>1&&t.depth<4);return x.useEffect(()=>{if(!s.length)return;const t=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&a(r.target.id)})},{rootMargin:"-100px 0px -66% 0px"});return s.forEach(e=>{const r=document.getElementById(e.slug);r&&t.observe(r)}),()=>t.disconnect()},[s]),s.length?o.jsxs("nav",{className:"sticky top-24 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4",children:[o.jsx("h3",{className:"font-sans text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6",children:"Contents"}),o.jsx("ul",{className:"space-y-4",children:s.map(t=>o.jsx("li",{style:{paddingLeft:`${(t.depth-2)*1}rem`},children:o.jsx("a",{href:`#${t.slug}`,className:`block text-xs font-sans font-bold leading-tight transition-all duration-300 border-none ${i===t.slug?"text-orange-600 translate-x-1":"text-slate-400 hover:text-slate-600"}`,children:t.text})},t.slug))})]}):null};export{h as default};
