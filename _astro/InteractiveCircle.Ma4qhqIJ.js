import{r as m}from"./index.WFquGv8Z.js";var u={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function p(){if(d)return a;d=1;var r=Symbol.for("react.transitional.element"),l=Symbol.for("react.fragment");function n(c,e,t){var i=null;if(t!==void 0&&(i=""+t),e.key!==void 0&&(i=""+e.key),"key"in e){t={};for(var o in e)o!=="key"&&(t[o]=e[o])}else t=e;return e=t.ref,{$$typeof:r,type:c,key:i,ref:e!==void 0?e:null,props:t}}return a.Fragment=l,a.jsx=n,a.jsxs=n,a}var x;function v(){return x||(x=1,u.exports=p()),u.exports}var s=v();const R=()=>{const[r,l]=m.useState(50);return s.jsxs("div",{className:"flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[3rem] border border-slate-100 my-12",children:[s.jsx("div",{className:"bg-emerald-500 rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/20",style:{width:`${r}px`,height:`${r}px`}}),s.jsxs("div",{className:"mt-8 flex flex-col items-center gap-4",children:[s.jsxs("label",{className:"font-sans text-xs uppercase tracking-widest font-bold text-slate-400",children:["Adjust Parameter $\\sigma = ",r,"$"]}),s.jsx("input",{type:"range",min:"20",max:"200",value:r,onChange:n=>l(parseInt(n.target.value)),className:"w-48 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"})]}),s.jsx("p",{className:"mt-4 font-sans text-xs text-slate-400 italic",children:"(Example React component embedded in MDX)"})]})};export{R as default};
