import{s as m,e as _,o as u,u as p,g as h,f as w}from"../chunks/scheduler.2364b0ad.js";import{S as g,i as b,d as f,v,f as y,t as L}from"../chunks/index.be5c2245.js";import{s as l}from"../chunks/supabase.4d2148cf.js";import{j}from"../chunks/singletons.d53d9455.js";const d=j("invalidate_all");function r(o){let t;const i=o[2].default,n=_(i,o,o[1],null),c={c:function(){n&&n.c()},l:function(a){n&&n.l(a)},m:function(a,e){n&&n.m(a,e),t=!0},p:function(a,[e]){n&&n.p&&(!t||e&2)&&p(n,i,a,a[1],t?w(i,a[1],e,null):h(a[1]),null)},i:function(a){t||(y(n,a),t=!0)},o:function(a){L(n,a),t=!1},d:function(a){n&&n.d(a)}};return f("SvelteRegisterBlock",{block:c,id:r.name,type:"component",source:"",ctx:o}),c}function S(o,t,i){let{$$slots:n={},$$scope:c}=t;v("Layout",n,["default"]);let{data:s}=t;u(()=>{const{data:{subscription:e}}=l.auth.onAuthStateChange(()=>{d()});return()=>{e.unsubscribe()}}),o.$$.on_mount.push(function(){s===void 0&&!("data"in t||o.$$.bound[o.$$.props.data])&&console.warn("<Layout> was created without expected prop 'data'")});const a=["data"];return Object.keys(t).forEach(e=>{!~a.indexOf(e)&&e.slice(0,2)!=="$$"&&e!=="slot"&&console.warn(`<Layout> was created with unknown prop '${e}'`)}),o.$$set=e=>{"data"in e&&i(0,s=e.data),"$$scope"in e&&i(1,c=e.$$scope)},o.$capture_state=()=>({onMount:u,supabaseClient:l,invalidateAll:d,data:s}),o.$inject_state=e=>{"data"in e&&i(0,s=e.data)},t&&"$$inject"in t&&o.$inject_state(t.$$inject),[s,c,n]}class P extends g{constructor(t){super(t),b(this,t,S,r,m,{data:0}),f("SvelteRegisterComponent",{component:this,tagName:"Layout",options:t,id:r.name})}get data(){throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set data(t){throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}}export{P as component};