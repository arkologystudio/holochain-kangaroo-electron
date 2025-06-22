/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const e=(e,r,n)=>{if(typeof MutationObserver==="undefined"){return}const u=new MutationObserver((e=>{n(t(e,r))}));u.observe(e,{childList:true,subtree:true});return u};const t=(e,t)=>{let n;e.forEach((e=>{for(let u=0;u<e.addedNodes.length;u++){n=r(e.addedNodes[u],t)||n}}));return n};const r=(e,t)=>{if(e.nodeType!==1){return undefined}const r=e.tagName===t.toUpperCase()?[e]:Array.from(e.querySelectorAll(t));return r.find((t=>t.value===e.value))};export{e as w};
//# sourceMappingURL=p-28b49746.js.map