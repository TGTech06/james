import{s as S,d as h,n as p}from"../chunks/scheduler.cc9b4bb6.js";import{S as k,i as b,d as P,v as A,j as v,s as E,o as j,k as f,A as w,c as O,l as R,p as y,g as r,m as V,a as u,z as _}from"../chunks/index.1aee684b.js";const x="src/routes/+page.svelte";function g(d){let t,l="Welcome to SvelteKit",i,e,s,n,C="kit.svelte.dev",m;const $={c:function(){t=v("h1"),t.textContent=l,i=E(),e=v("p"),s=j("Visit "),n=v("a"),n.textContent=C,m=j(" to read the documentation"),this.h()},l:function(a){t=f(a,"H1",{"data-svelte-h":!0}),w(t)!=="svelte-yyjjjs"&&(t.textContent=l),i=O(a),e=f(a,"P",{});var o=R(e);s=y(o,"Visit "),n=f(o,"A",{href:!0,"data-svelte-h":!0}),w(n)!=="svelte-r2hwjt"&&(n.textContent=C),m=y(o," to read the documentation"),o.forEach(r),this.h()},h:function(){h(t,x,0,0,0),V(n,"href","https://kit.svelte.dev"),h(n,x,1,9,39),h(e,x,1,0,30)},m:function(a,o){u(a,t,o),u(a,i,o),u(a,e,o),_(e,s),_(e,n),_(e,m)},p,i:p,o:p,d:function(a){a&&(r(t),r(i),r(e))}};return P("SvelteRegisterBlock",{block:$,id:g.name,type:"component",source:"",ctx:d}),$}function q(d,t){let{$$slots:l={},$$scope:i}=t;A("Page",l,[]);const e=[];return Object.keys(t).forEach(s=>{!~e.indexOf(s)&&s.slice(0,2)!=="$$"&&s!=="slot"&&console.warn(`<Page> was created with unknown prop '${s}'`)}),[]}class D extends k{constructor(t){super(t),b(this,t,q,g,S,{}),P("SvelteRegisterComponent",{component:this,tagName:"Page",options:t,id:g.name})}}export{D as component};
