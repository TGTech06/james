function x(){}function k(t,n){for(const e in n)t[e]=n[e];return t}function M(t,n,e,o,r){t.__svelte_meta={loc:{file:n,line:e,column:o,char:r}}}function w(t){return t()}function A(){return Object.create(null)}function j(t){t.forEach(w)}function C(t){return typeof t=="function"}function D(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function F(t){return Object.keys(t).length===0}function P(t,n){if(t!=null&&typeof t.subscribe!="function")throw new Error(`'${n}' is not a store with a 'subscribe' method`)}function v(t,...n){if(t==null){for(const o of n)o(void 0);return x}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t,n,e){t.$$.on_destroy.push(v(n,e))}function U(t,n,e,o){if(t){const r=y(t,n,e,o);return t[0](r)}}function y(t,n,e,o){return t[1]&&o?k(e.ctx.slice(),t[1](o(n))):e.ctx}function B(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],_=Math.max(n.dirty.length,r.length);for(let u=0;u<_;u+=1)a[u]=n.dirty[u]|r[u];return a}return n.dirty|r}return n.dirty}function G(t,n,e,o,r,a){if(r){const _=y(n,e,o,a);t.p(_,r)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}let l;function d(t){l=t}function f(){if(!l)throw new Error("Function called outside component initialization");return l}function I(t){f().$$.on_mount.push(t)}function J(t){f().$$.after_update.push(t)}function K(t){f().$$.on_destroy.push(t)}function L(t,n){return f().$$.context.set(t,n),n}const i=[],b=[];let s=[];const g=[],m=Promise.resolve();let p=!1;function E(){p||(p=!0,m.then(q))}function N(){return E(),m}function O(t){s.push(t)}const h=new Set;let c=0;function q(){if(c!==0)return;const t=l;do{try{for(;c<i.length;){const n=i[c];c++,d(n),z(n.$$)}}catch(n){throw i.length=0,c=0,n}for(d(null),i.length=0,c=0;b.length;)b.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];h.has(e)||(h.add(e),e())}s.length=0}while(i.length);for(;g.length;)g.pop()();p=!1,h.clear(),d(t)}function z(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function Q(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{E as A,J as a,L as b,b as c,M as d,U as e,B as f,H as g,S as h,K as i,O as j,A as k,q as l,l as m,x as n,I as o,d as p,C as q,j as r,D as s,N as t,G as u,P as v,F as w,w as x,Q as y,i as z};
