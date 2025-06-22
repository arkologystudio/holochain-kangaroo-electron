import{k as o,w as s}from"./p-4f4b7319.js";import{a as t,s as a}from"./p-eeff07ad.js";import{c as r}from"./p-510302c3.js";import"./p-1665515a.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const n=()=>{const n=window;n.addEventListener("statusTap",(()=>{o((()=>{const o=n.innerWidth;const c=n.innerHeight;const e=document.elementFromPoint(o/2,c/2);if(!e){return}const f=t(e);if(f){new Promise((o=>r(f,o))).then((()=>{s((async()=>{f.style.setProperty("--overflow","hidden");await a(f,300);f.style.removeProperty("--overflow")}))}))}}))}))};export{n as startStatusTap};
//# sourceMappingURL=p-08b834e8.js.map