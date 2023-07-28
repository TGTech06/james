import{s as rt,o as Ze,d as s,n as $e}from"../chunks/scheduler.2364b0ad.js";import{S as st,i as ot,d as xe,v as it,j as o,u as lt,s as b,k as i,l as O,w as ut,c as f,A as p,g as A,m as r,a as ke,z as n,x as ct,f as dt,t as ht,y as mt,B as et}from"../chunks/index.e0615928.js";import{g as pt}from"../chunks/globals.7f7f1b26.js";import{f as bt,u as ft}from"../chunks/files.e71f4db2.js";import{c as Ge}from"../chunks/question.3ffbfd3a.js";import{b as vt}from"../chunks/brain.c0d8c4fe.js";import{c as ge,P as he,a as me,b as Ne}from"../chunks/public.79d73255.js";import{d as Fe}from"../chunks/_commonjs-dynamic-modules.5fcb8f34.js";import{E as gt,g as ee,i as xt,N as tt,H as Qe,S as Xe,A as At}from"../chunks/NavBar.74969093.js";import{g as yt,f as _t}from"../chunks/azure.11841502.js";import{c as It}from"../chunks/chunk.76ad1e6a.js";import{w as ue}from"../chunks/index.db1f7a41.js";class wt extends gt{constructor(e,a){super(e??{}),Object.defineProperty(this,"modelName",{enumerable:!0,configurable:!0,writable:!0,value:"text-embedding-ada-002"}),Object.defineProperty(this,"batchSize",{enumerable:!0,configurable:!0,writable:!0,value:512}),Object.defineProperty(this,"stripNewLines",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"timeout",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiVersion",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiInstanceName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiDeploymentName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIBasePath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientConfig",{enumerable:!0,configurable:!0,writable:!0,value:void 0});const u=(e==null?void 0:e.openAIApiKey)??ee("OPENAI_API_KEY"),h=(e==null?void 0:e.azureOpenAIApiKey)??ee("AZURE_OPENAI_API_KEY");if(!h&&!u)throw new Error("OpenAI or Azure OpenAI API key not found");const d=(e==null?void 0:e.azureOpenAIApiInstanceName)??ee("AZURE_OPENAI_API_INSTANCE_NAME"),m=((e==null?void 0:e.azureOpenAIApiEmbeddingsDeploymentName)||(e==null?void 0:e.azureOpenAIApiDeploymentName))??(ee("AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME")||ee("AZURE_OPENAI_API_DEPLOYMENT_NAME")),c=(e==null?void 0:e.azureOpenAIApiVersion)??ee("AZURE_OPENAI_API_VERSION");if(this.azureOpenAIBasePath=(e==null?void 0:e.azureOpenAIBasePath)??ee("AZURE_OPENAI_BASE_PATH"),this.modelName=(e==null?void 0:e.modelName)??this.modelName,this.batchSize=(e==null?void 0:e.batchSize)??(h?1:this.batchSize),this.stripNewLines=(e==null?void 0:e.stripNewLines)??this.stripNewLines,this.timeout=e==null?void 0:e.timeout,this.azureOpenAIApiVersion=c,this.azureOpenAIApiKey=h,this.azureOpenAIApiInstanceName=d,this.azureOpenAIApiDeploymentName=m,this.azureOpenAIApiKey){if(!this.azureOpenAIApiInstanceName)throw new Error("Azure OpenAI API instance name not found");if(!this.azureOpenAIApiDeploymentName)throw new Error("Azure OpenAI API deployment name not found");if(!this.azureOpenAIApiVersion)throw new Error("Azure OpenAI API version not found")}this.clientConfig={apiKey:u,...a}}async embedDocuments(e){const a=It(this.stripNewLines?e.map(h=>h.replace(/\n/g," ")):e,this.batchSize),u=[];for(let h=0;h<a.length;h+=1){const d=a[h],{data:m}=await this.embeddingWithRetry({model:this.modelName,input:d});for(let c=0;c<d.length;c+=1)u.push(m.data[c].embedding)}return u}async embedQuery(e){const{data:a}=await this.embeddingWithRetry({model:this.modelName,input:this.stripNewLines?e.replace(/\n/g," "):e});return a.data[0].embedding}async embeddingWithRetry(e){if(!this.client){const u={azureOpenAIApiDeploymentName:this.azureOpenAIApiDeploymentName,azureOpenAIApiInstanceName:this.azureOpenAIApiInstanceName,azureOpenAIApiKey:this.azureOpenAIApiKey,azureOpenAIBasePath:this.azureOpenAIBasePath,basePath:this.clientConfig.basePath},h=yt(u),d=new Fe.Configuration({...this.clientConfig,basePath:h,baseOptions:{timeout:this.timeout,adapter:xt()?void 0:_t,...this.clientConfig.baseOptions}});this.client=new Fe.OpenAIApi(d)}const a={};return this.azureOpenAIApiKey&&(a.headers={"api-key":this.azureOpenAIApiKey,...a.headers},a.params={"api-version":this.azureOpenAIApiVersion,...a.params}),this.caller.call(this.client.createEmbedding.bind(this.client),e,a)}}const{console:Ct}=pt,l="src/routes/+page.svelte";function nt(g){let e,a="Log In",u,h;const d={c:function(){e=o("button"),e.textContent=a,this.h()},l:function(c){e=i(c,"BUTTON",{class:!0,"data-svelte-h":!0}),p(e)!=="svelte-q8u9rg"&&(e.textContent=a),this.h()},h:function(){r(e,"class","btn btn-primary btn-lg mt-8 rounded-md uppercase"),s(e,l,175,6,3646)},m:function(c,v){ke(c,e,v),u||(h=et(e,"click",g[2],!1,!1,!1,!1),u=!0)},p:$e,d:function(c){c&&A(e),u=!1,h()}};return xe("SvelteRegisterBlock",{block:d,id:nt.name,type:"else",source:"(119:4) {:else}",ctx:g}),d}function at(g){let e,a="Get Started",u,h;const d={c:function(){e=o("button"),e.textContent=a,this.h()},l:function(c){e=i(c,"BUTTON",{class:!0,"data-svelte-h":!0}),p(e)!=="svelte-x6p7fq"&&(e.textContent=a),this.h()},h:function(){r(e,"class","btn btn-primary btn-lg mt-8 rounded-md uppercase"),s(e,l,168,6,3451)},m:function(c,v){ke(c,e,v),u||(h=et(e,"click",g[1],!1,!1,!1,!1),u=!0)},p:$e,d:function(c){c&&A(e),u=!1,h()}};return xe("SvelteRegisterBlock",{block:d,id:at.name,type:"if",source:"(112:4) {#if userLoggedIn}",ctx:g}),d}function ze(g){let e,a,u,h,d,m="Welcome to 🧠 James 🧠",c,v,P,te=`James is an AI-powered assistant that can remember everything you tell
        him and answer your questions. He is a smart and curious AI, constantly
        learning and improving with every interaction.`,ne,I,F=`Whether you need help with research, have questions about various
        topics, or simply want to chat, James should be here to assist you.
        PLEASE provide feedback and suggestions to help him become even better!`,q,B,E,U="What James can help you with (when he feels like it):",ce,x,y,L,w,pe="🔍",de,t,R="Research",ae,H,Se=`James can read and remember entire books, articles, and web pages. He
          can also answer your questions about what he has read, but don't try
          to trick him, he's smarter than you.`,Ae,N,Q,D,De="📚",ye,T,je="Studying",_e,J,Ve=`With James by your side, you will probably never need to study again,
          but if you do, he can help you with that too. He can make flashcards,
          answer questions, and even help you with your homework (but don't tell
          your teacher).`,Ie,z,X,j,Be="💻",we,W,Le="Programming",Ce,M,Re=`James can swallow up entire documentation pages so you don't have to.
          If you have a question about a programming language or framework, he
          can hopefully answer it. He can also help you with your code, but he's
          not very good at it yet.`,Oe,k,$,V,Ke="💬",Pe,Y,qe="Chat with Your Notes",Ee,Z,Ue=`Please let James read all your personal notes and thoughts. He
          promises he won't tell anyone. He can also answer your questions and
          have a conversation with you.`,be;u=new tt({$$inline:!0});function He(K,_){return K[0]?at:nt}let fe=He(g),S=fe(g);const Te={c:function(){e=o("div"),a=o("div"),lt(u.$$.fragment),h=b(),d=o("h1"),d.textContent=m,c=b(),v=o("div"),P=o("p"),P.textContent=te,ne=b(),I=o("p"),I.textContent=F,q=b(),S.c(),B=b(),E=o("p"),E.textContent=U,ce=b(),x=o("div"),y=o("div"),L=o("div"),w=o("span"),w.textContent=pe,de=b(),t=o("h3"),t.textContent=R,ae=b(),H=o("p"),H.textContent=Se,Ae=b(),N=o("div"),Q=o("div"),D=o("span"),D.textContent=De,ye=b(),T=o("h3"),T.textContent=je,_e=b(),J=o("p"),J.textContent=Ve,Ie=b(),z=o("div"),X=o("div"),j=o("span"),j.textContent=Be,we=b(),W=o("h3"),W.textContent=Le,Ce=b(),M=o("p"),M.textContent=Re,Oe=b(),k=o("div"),$=o("div"),V=o("span"),V.textContent=Ke,Pe=b(),Y=o("h3"),Y.textContent=qe,Ee=b(),Z=o("p"),Z.textContent=Ue,this.h()},l:function(_){e=i(_,"DIV",{class:!0});var re=O(e);a=i(re,"DIV",{class:!0});var C=O(a);ut(u.$$.fragment,C),h=f(C),d=i(C,"H1",{class:!0,"data-svelte-h":!0}),p(d)!=="svelte-eg541c"&&(d.textContent=m),c=f(C),v=i(C,"DIV",{class:!0});var ve=O(v);P=i(ve,"P",{class:!0,"data-svelte-h":!0}),p(P)!=="svelte-11zjwmi"&&(P.textContent=te),ne=f(ve),I=i(ve,"P",{class:!0,"data-svelte-h":!0}),p(I)!=="svelte-1a5mza6"&&(I.textContent=F),ve.forEach(A),q=f(C),S.l(C),B=f(C),E=i(C,"P",{class:!0,"data-svelte-h":!0}),p(E)!=="svelte-11mrk0x"&&(E.textContent=U),ce=f(C),x=i(C,"DIV",{class:!0});var G=O(x);y=i(G,"DIV",{class:!0});var se=O(y);L=i(se,"DIV",{class:!0});var Je=O(L);w=i(Je,"SPAN",{class:!0,role:!0,"aria-label":!0,"data-svelte-h":!0}),p(w)!=="svelte-11x69qr"&&(w.textContent=pe),Je.forEach(A),de=f(se),t=i(se,"H3",{class:!0,"data-svelte-h":!0}),p(t)!=="svelte-i1u10v"&&(t.textContent=R),ae=f(se),H=i(se,"P",{class:!0,"data-svelte-h":!0}),p(H)!=="svelte-wei2ry"&&(H.textContent=Se),se.forEach(A),Ae=f(G),N=i(G,"DIV",{class:!0});var oe=O(N);Q=i(oe,"DIV",{class:!0});var We=O(Q);D=i(We,"SPAN",{class:!0,role:!0,"aria-label":!0,"data-svelte-h":!0}),p(D)!=="svelte-fmzpxq"&&(D.textContent=De),We.forEach(A),ye=f(oe),T=i(oe,"H3",{class:!0,"data-svelte-h":!0}),p(T)!=="svelte-95dyc1"&&(T.textContent=je),_e=f(oe),J=i(oe,"P",{class:!0,"data-svelte-h":!0}),p(J)!=="svelte-1mfy6pe"&&(J.textContent=Ve),oe.forEach(A),Ie=f(G),z=i(G,"DIV",{class:!0});var ie=O(z);X=i(ie,"DIV",{class:!0});var Me=O(X);j=i(Me,"SPAN",{class:!0,role:!0,"aria-label":!0,"data-svelte-h":!0}),p(j)!=="svelte-1k43zwj"&&(j.textContent=Be),Me.forEach(A),we=f(ie),W=i(ie,"H3",{class:!0,"data-svelte-h":!0}),p(W)!=="svelte-1um5ujz"&&(W.textContent=Le),Ce=f(ie),M=i(ie,"P",{class:!0,"data-svelte-h":!0}),p(M)!=="svelte-1qxxuj0"&&(M.textContent=Re),ie.forEach(A),Oe=f(G),k=i(G,"DIV",{class:!0});var le=O(k);$=i(le,"DIV",{class:!0});var Ye=O($);V=i(Ye,"SPAN",{class:!0,role:!0,"aria-label":!0,"data-svelte-h":!0}),p(V)!=="svelte-4tb5jr"&&(V.textContent=Ke),Ye.forEach(A),Pe=f(le),Y=i(le,"H3",{class:!0,"data-svelte-h":!0}),p(Y)!=="svelte-2szua"&&(Y.textContent=qe),Ee=f(le),Z=i(le,"P",{class:!0,"data-svelte-h":!0}),p(Z)!=="svelte-1rzn3qx"&&(Z.textContent=Ue),le.forEach(A),G.forEach(A),C.forEach(A),re.forEach(A),this.h()},h:function(){r(d,"class","text-6xl font-bold my-8"),s(d,l,152,4,2747),r(P,"class","text-xl text-center mb-6"),s(P,l,155,6,2864),r(I,"class","text-xl text-center mb-6"),s(I,l,160,6,3132),r(v,"class","max-w-3xl mx-auto space-y-4"),s(v,l,154,4,2816),r(E,"class","text-xl text-center mt-8 mb-6"),s(E,l,183,4,3832),r(w,"class","text-8xl"),r(w,"role","img"),r(w,"aria-label","Research"),s(w,l,191,10,4214),r(L,"class","flex items-center justify-center mb-4"),s(L,l,190,8,4152),r(t,"class","text-2xl font-bold text-white text-center"),s(t,l,193,8,4303),r(H,"class","text-lg text-white text-center"),s(H,l,194,8,4379),r(y,"class","bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"),s(y,l,189,6,4070),r(D,"class","text-8xl"),r(D,"role","img"),r(D,"aria-label","Study"),s(D,l,202,10,4804),r(Q,"class","flex items-center justify-center mb-4"),s(Q,l,201,8,4742),r(T,"class","text-2xl font-bold text-white text-center"),s(T,l,204,8,4890),r(J,"class","text-lg text-white text-center"),s(J,l,205,8,4966),r(N,"class","bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"),s(N,l,200,6,4660),r(j,"class","text-8xl"),r(j,"role","img"),r(j,"aria-label","Programming"),s(j,l,214,10,5451),r(X,"class","flex items-center justify-center mb-4"),s(X,l,213,8,5389),r(W,"class","text-2xl font-bold text-white text-center"),s(W,l,216,8,5543),r(M,"class","text-lg text-white text-center"),s(M,l,217,8,5622),r(z,"class","bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"),s(z,l,212,6,5307),r(V,"class","text-8xl"),r(V,"role","img"),r(V,"aria-label","Chat"),s(V,l,226,10,6116),r($,"class","flex items-center justify-center mb-4"),s($,l,225,8,6054),r(Y,"class","text-2xl font-bold text-white text-center"),s(Y,l,228,8,6201),r(Z,"class","text-lg text-white text-center"),s(Z,l,231,8,6309),r(k,"class","bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4"),s(k,l,224,6,5972),r(x,"class","grid gap-8 md:grid-cols-2 max-w-3xl mx-auto mb-8"),s(x,l,188,4,4001),r(a,"class","flex flex-col items-center"),s(a,l,149,2,2658),r(e,"class","flex flex-col min-h-screen bg-gray-900 text-white p-4"),s(e,l,148,0,2588)},m:function(_,re){ke(_,e,re),n(e,a),ct(u,a,null),n(a,h),n(a,d),n(a,c),n(a,v),n(v,P),n(v,ne),n(v,I),n(a,q),S.m(a,null),n(a,B),n(a,E),n(a,ce),n(a,x),n(x,y),n(y,L),n(L,w),n(y,de),n(y,t),n(y,ae),n(y,H),n(x,Ae),n(x,N),n(N,Q),n(Q,D),n(N,ye),n(N,T),n(N,_e),n(N,J),n(x,Ie),n(x,z),n(z,X),n(X,j),n(z,we),n(z,W),n(z,Ce),n(z,M),n(x,Oe),n(x,k),n(k,$),n($,V),n(k,Pe),n(k,Y),n(k,Ee),n(k,Z),be=!0},p:function(_,[re]){fe===(fe=He(_))&&S?S.p(_,re):(S.d(1),S=fe(_),S&&(S.c(),S.m(a,B)))},i:function(_){be||(dt(u.$$.fragment,_),be=!0)},o:function(_){ht(u.$$.fragment,_),be=!1},d:function(_){_&&A(e),mt(u),S.d()}};return xe("SvelteRegisterBlock",{block:Te,id:ze.name,type:"component",source:"",ctx:g}),Te}function Ot(g,e,a){let{$$slots:u={},$$scope:h}=e;it("Page",u,[]);let d=ue("Add Knowledge"),m=ue("tiiuae/falcon-7b-instruct"),c=ue(.2),v=ue(500),P=ue(0),te,ne,I="",F,q,B,E="",U=!1;async function ce(){const{error:t}=await F.auth.signOut();t?console.log(t):window.location.reload()}async function x(){let t=await Ge(Ne,q,m,c,I);const R=document.getElementById("displayTextContainer");R.textContent=t}const y=async()=>{const t=ge(me,he),{data:{session:R},error:ae}=await t.auth.getSession();return ae?(console.log(ae),null):(R!=null&&R.user?a(0,U=!0):a(0,U=!1),R)};Ze(()=>{y(),F=ge(me,he),console.log("public_supabase_url",me),console.log("public_supabase_key",he);const t=ge(me,he);B=new Qe({apiKey:Ne}),q=new Xe(B,{client:t,tableName:"documents"})});async function L(t){te=t.target.files[0]}const w=[];Object.keys(e).forEach(t=>{!~w.indexOf(t)&&t.slice(0,2)!=="$$"&&t!=="slot"&&Ct.warn(`<Page> was created with unknown prop '${t}'`)});const pe=()=>window.location.href="/upload",de=()=>window.location.href="/login";return g.$capture_state=()=>({onMount:Ze,file_uploader:bt,url_uploader:ft,chatWithDoc:Ge,brain:vt,createClient:ge,OpenAIEmbeddings:wt,SupabaseVectorStore:Xe,writable:ue,HuggingFaceInferenceEmbeddings:Qe,PUBLIC_SUPABASE_KEY:he,PUBLIC_SUPABASE_URL:me,PUBLIC_HUGGINGFACE_API_KEY:Ne,AuthCheck:At,NavBar:tt,mode:d,model:m,temperature:c,chunkSize:v,chunkOverlap:P,files:te,url:ne,question:I,supabase:F,vector:q,embeddings:B,retrievedText:E,userLoggedIn:U,signOutUser:ce,getAIResponse:x,getSessionData:y,upload:L}),g.$inject_state=t=>{"mode"in t&&(d=t.mode),"model"in t&&(m=t.model),"temperature"in t&&(c=t.temperature),"chunkSize"in t&&(v=t.chunkSize),"chunkOverlap"in t&&(P=t.chunkOverlap),"files"in t&&(te=t.files),"url"in t&&(ne=t.url),"question"in t&&(I=t.question),"supabase"in t&&(F=t.supabase),"vector"in t&&(q=t.vector),"embeddings"in t&&(B=t.embeddings),"retrievedText"in t&&(E=t.retrievedText),"userLoggedIn"in t&&a(0,U=t.userLoggedIn)},e&&"$$inject"in e&&g.$inject_state(e.$$inject),[U,pe,de]}class Kt extends st{constructor(e){super(e),ot(this,e,Ot,ze,rt,{}),xe("SvelteRegisterComponent",{component:this,tagName:"Page",options:e,id:ze.name})}}export{Kt as component};