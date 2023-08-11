import{s as te,d as l,n as $,r as ae}from"../chunks/scheduler.2364b0ad.js";import{S as se,i as ne,d as ee,v as le,j as r,s as E,o as re,k as o,l as P,A as B,c as A,g as b,p as oe,m as e,a as ie,z as t,B as J,K as ce}from"../chunks/index.9f7452a2.js";import{c as Q,P as W,a as X}from"../chunks/public.9062b0fe.js";const i="src/routes/register/+page.svelte";function z(p){let a,f,m,N="Register",C,s,c,d,I="Email",n,_,U,v,u,F="Password",R,y,M,h,H="Register",O,x,T,g,Y="Login",q,Z;const G={c:function(){a=r("main"),f=r("div"),m=r("h1"),m.textContent=N,C=E(),s=r("form"),c=r("div"),d=r("label"),d.textContent=I,n=E(),_=r("input"),U=E(),v=r("div"),u=r("label"),u.textContent=F,R=E(),y=r("input"),M=E(),h=r("button"),h.textContent=H,O=E(),x=r("div"),T=re("Already have an account? "),g=r("a"),g.textContent=Y,this.h()},l:function(k){a=o(k,"MAIN",{class:!0});var L=P(a);f=o(L,"DIV",{class:!0});var S=P(f);m=o(S,"H1",{class:!0,"data-svelte-h":!0}),B(m)!=="svelte-ygwsag"&&(m.textContent=N),C=A(S),s=o(S,"FORM",{});var w=P(s);c=o(w,"DIV",{class:!0});var V=P(c);d=o(V,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),B(d)!=="svelte-njy74e"&&(d.textContent=I),n=A(V),_=o(V,"INPUT",{type:!0,name:!0,class:!0}),V.forEach(b),U=A(w),v=o(w,"DIV",{class:!0});var D=P(v);u=o(D,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),B(u)!=="svelte-fxoko8"&&(u.textContent=F),R=A(D),y=o(D,"INPUT",{type:!0,name:!0,class:!0}),D.forEach(b),M=A(w),h=o(w,"BUTTON",{class:!0,"data-svelte-h":!0}),B(h)!=="svelte-egqvry"&&(h.textContent=H),O=A(w),x=o(w,"DIV",{class:!0});var K=P(x);T=oe(K,"Already have an account? "),g=o(K,"A",{href:!0,class:!0,"data-svelte-h":!0}),B(g)!=="svelte-1wxmq1k"&&(g.textContent=Y),K.forEach(b),w.forEach(b),S.forEach(b),L.forEach(b),this.h()},h:function(){e(m,"class","text-3xl font-semibold text-white text-center mb-6"),l(m,i,33,4,842),e(d,"for","email"),e(d,"class","block text-gray-300 text-sm font-bold"),l(d,i,36,8,1001),e(_,"type","text"),e(_,"name","email"),e(_,"class","form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"),l(_,i,39,8,1108),e(c,"class","mb-4"),l(c,i,35,6,974),e(u,"for","password"),e(u,"class","block text-gray-300 text-sm font-bold"),l(u,i,46,8,1308),e(y,"type","password"),e(y,"name","password"),e(y,"class","form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"),l(y,i,49,8,1421),e(v,"class","mb-4"),l(v,i,45,6,1281),e(h,"class","btn btn-primary w-full py-3 rounded-lg"),l(h,i,55,6,1601),e(g,"href","#"),e(g,"class","underline"),l(g,i,57,33,1766),e(x,"class","mt-4 text-gray-300 text-sm text-center"),l(x,i,56,6,1680),l(s,i,34,4,923),e(f,"class","bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"),l(f,i,32,2,771),e(a,"class","min-h-screen flex items-center justify-center bg-gray-800 s-3VVNyCg7ZOTK"),l(a,i,31,0,696)},m:function(k,L){ie(k,a,L),t(a,f),t(f,m),t(f,C),t(f,s),t(s,c),t(c,d),t(c,n),t(c,_),t(s,U),t(s,v),t(v,u),t(v,R),t(v,y),t(s,M),t(s,h),t(s,O),t(s,x),t(x,T),t(x,g),q||(Z=[J(g,"click",p[1],!1,!1,!1,!1),J(s,"submit",ce(p[0]),!1,!0,!1,!1)],q=!0)},p:$,i:$,o:$,d:function(k){k&&b(a),q=!1,ae(Z)}};return ee("SvelteRegisterBlock",{block:G,id:z.name,type:"component",source:"",ctx:p}),G}function de(p,a,f){let{$$slots:m={},$$scope:N}=a;le("Page",m,[]);const C=Q(X,W);let s="";const c=async n=>{n.preventDefault();const _=n.target.email.value,U=n.target.password.value,{data:v,error:u}=await C.auth.signUp({email:_,password:U});u?s=u.message:(s="",window.location.href="/")},d=()=>{window.location.href="/login"},I=[];return Object.keys(a).forEach(n=>{!~I.indexOf(n)&&n.slice(0,2)!=="$$"&&n!=="slot"&&console.warn(`<Page> was created with unknown prop '${n}'`)}),p.$capture_state=()=>({createClient:Q,PUBLIC_SUPABASE_KEY:W,PUBLIC_SUPABASE_URL:X,supabaseClient:C,errorMessage:s,createUser:c,toggleView:d}),p.$inject_state=n=>{"errorMessage"in n&&(s=n.errorMessage)},a&&"$$inject"in a&&p.$inject_state(a.$$inject),[c,d]}class ve extends se{constructor(a){super(a),ne(this,a,de,z,te,{}),ee("SvelteRegisterComponent",{component:this,tagName:"Page",options:a,id:z.name})}}export{ve as component};
