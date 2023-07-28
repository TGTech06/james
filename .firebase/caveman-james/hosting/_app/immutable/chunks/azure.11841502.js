function Se(e,t){return function(){return e.apply(t,arguments)}}const{toString:He}=Object.prototype,{getPrototypeOf:re}=Object,H=(e=>t=>{const n=He.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),O=e=>(e=e.toLowerCase(),t=>H(t)===e),q=e=>t=>typeof t===e,{isArray:g}=Array,D=q("undefined");function qe(e){return e!==null&&!D(e)&&e.constructor!==null&&!D(e.constructor)&&b(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Ae=O("ArrayBuffer");function Je(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Ae(e.buffer),t}const Me=q("string"),b=q("function"),Oe=q("number"),J=e=>e!==null&&typeof e=="object",Ve=e=>e===!0||e===!1,L=e=>{if(H(e)!=="object")return!1;const t=re(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},We=O("Date"),Ke=O("File"),ve=O("Blob"),Ge=O("FileList"),Xe=e=>J(e)&&b(e.pipe),Qe=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||b(e.append)&&((t=H(e))==="formdata"||t==="object"&&b(e.toString)&&e.toString()==="[object FormData]"))},Ye=O("URLSearchParams"),Ze=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function F(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),g(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let c;for(r=0;r<i;r++)c=o[r],t.call(null,e[c],c,e)}}function Re(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const Ne=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Te=e=>!D(e)&&e!==Ne;function Y(){const{caseless:e}=Te(this)&&this||{},t={},n=(r,s)=>{const o=e&&Re(t,s)||s;L(t[o])&&L(r)?t[o]=Y(t[o],r):L(r)?t[o]=Y({},r):g(r)?t[o]=r.slice():t[o]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&F(arguments[r],n);return t}const et=(e,t,n,{allOwnKeys:r}={})=>(F(t,(s,o)=>{n&&b(s)?e[o]=Se(s,n):e[o]=s},{allOwnKeys:r}),e),tt=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),nt=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},rt=(e,t,n,r)=>{let s,o,i;const c={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!r||r(i,e,t))&&!c[i]&&(t[i]=e[i],c[i]=!0);e=n!==!1&&re(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},st=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},ot=e=>{if(!e)return null;if(g(e))return e;let t=e.length;if(!Oe(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},it=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&re(Uint8Array)),at=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=r.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},ct=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},ut=O("HTMLFormElement"),lt=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),ce=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),ft=O("RegExp"),xe=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};F(n,(s,o)=>{t(s,o,e)!==!1&&(r[o]=s)}),Object.defineProperties(e,r)},dt=e=>{xe(e,(t,n)=>{if(b(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(b(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},pt=(e,t)=>{const n={},r=s=>{s.forEach(o=>{n[o]=!0})};return g(e)?r(e):r(String(e).split(t)),n},ht=()=>{},mt=(e,t)=>(e=+e,Number.isFinite(e)?e:t),K="abcdefghijklmnopqrstuvwxyz",ue="0123456789",Pe={DIGIT:ue,ALPHA:K,ALPHA_DIGIT:K+K.toUpperCase()+ue},yt=(e=16,t=Pe.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function wt(e){return!!(e&&b(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Et=e=>{const t=new Array(10),n=(r,s)=>{if(J(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[s]=r;const o=g(r)?[]:{};return F(r,(i,c)=>{const f=n(i,s+1);!D(f)&&(o[c]=f)}),t[s]=void 0,o}}return r};return n(e,0)},bt=O("AsyncFunction"),St=e=>e&&(J(e)||b(e))&&b(e.then)&&b(e.catch),a={isArray:g,isArrayBuffer:Ae,isBuffer:qe,isFormData:Qe,isArrayBufferView:Je,isString:Me,isNumber:Oe,isBoolean:Ve,isObject:J,isPlainObject:L,isUndefined:D,isDate:We,isFile:Ke,isBlob:ve,isRegExp:ft,isFunction:b,isStream:Xe,isURLSearchParams:Ye,isTypedArray:it,isFileList:Ge,forEach:F,merge:Y,extend:et,trim:Ze,stripBOM:tt,inherits:nt,toFlatObject:rt,kindOf:H,kindOfTest:O,endsWith:st,toArray:ot,forEachEntry:at,matchAll:ct,isHTMLForm:ut,hasOwnProperty:ce,hasOwnProp:ce,reduceDescriptors:xe,freezeMethods:dt,toObjectSet:pt,toCamelCase:lt,noop:ht,toFiniteNumber:mt,findKey:Re,global:Ne,isContextDefined:Te,ALPHABET:Pe,generateString:yt,isSpecCompliantForm:wt,toJSONObject:Et,isAsyncFn:bt,isThenable:St};function m(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}a.inherits(m,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const ge=m.prototype,Ce={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Ce[e]={value:e}});Object.defineProperties(m,Ce);Object.defineProperty(ge,"isAxiosError",{value:!0});m.from=(e,t,n,r,s,o)=>{const i=Object.create(ge);return a.toFlatObject(e,i,function(f){return f!==Error.prototype},c=>c!=="isAxiosError"),m.call(i,e.message,t,n,r,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};const At=null;function Z(e){return a.isPlainObject(e)||a.isArray(e)}function De(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function le(e,t,n){return e?e.concat(t).map(function(s,o){return s=De(s),!n&&o?"["+s+"]":s}).join(n?".":""):t}function Ot(e){return a.isArray(e)&&!e.some(Z)}const Rt=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function M(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,R){return!a.isUndefined(R[h])});const r=n.metaTokens,s=n.visitor||l,o=n.dots,i=n.indexes,f=(n.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function u(d){if(d===null)return"";if(a.isDate(d))return d.toISOString();if(!f&&a.isBlob(d))throw new m("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(d)||a.isTypedArray(d)?f&&typeof Blob=="function"?new Blob([d]):Buffer.from(d):d}function l(d,h,R){let S=d;if(d&&!R&&typeof d=="object"){if(a.endsWith(h,"{}"))h=r?h:h.slice(0,-2),d=JSON.stringify(d);else if(a.isArray(d)&&Ot(d)||(a.isFileList(d)||a.endsWith(h,"[]"))&&(S=a.toArray(d)))return h=De(h),S.forEach(function(U,ze){!(a.isUndefined(U)||U===null)&&t.append(i===!0?le([h],ze,o):i===null?h:h+"[]",u(U))}),!1}return Z(d)?!0:(t.append(le(R,h,o),u(d)),!1)}const p=[],w=Object.assign(Rt,{defaultVisitor:l,convertValue:u,isVisitable:Z});function y(d,h){if(!a.isUndefined(d)){if(p.indexOf(d)!==-1)throw Error("Circular reference detected in "+h.join("."));p.push(d),a.forEach(d,function(S,x){(!(a.isUndefined(S)||S===null)&&s.call(t,S,a.isString(x)?x.trim():x,h,w))===!0&&y(S,h?h.concat(x):[x])}),p.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return y(e),t}function fe(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function se(e,t){this._pairs=[],e&&M(e,this,t)}const Fe=se.prototype;Fe.append=function(t,n){this._pairs.push([t,n])};Fe.toString=function(t){const n=t?function(r){return t.call(this,r,fe)}:fe;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function Nt(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Be(e,t,n){if(!t)return e;const r=n&&n.encode||Nt,s=n&&n.serialize;let o;if(s?o=s(t,n):o=a.isURLSearchParams(t)?t.toString():new se(t,n).toString(r),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class Tt{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(r){r!==null&&t(r)})}}const de=Tt,Ue={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},xt=typeof URLSearchParams<"u"?URLSearchParams:se,Pt=typeof FormData<"u"?FormData:null,gt=typeof Blob<"u"?Blob:null,Ct=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Dt=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),A={isBrowser:!0,classes:{URLSearchParams:xt,FormData:Pt,Blob:gt},isStandardBrowserEnv:Ct,isStandardBrowserWebWorkerEnv:Dt,protocols:["http","https","file","blob","url","data"]};function Ft(e,t){return M(e,new A.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,o){return A.isNode&&a.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function Bt(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Ut(e){const t={},n=Object.keys(e);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],t[o]=e[o];return t}function _e(e){function t(n,r,s,o){let i=n[o++];const c=Number.isFinite(+i),f=o>=n.length;return i=!i&&a.isArray(s)?s.length:i,f?(a.hasOwnProp(s,i)?s[i]=[s[i],r]:s[i]=r,!c):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(n,r,s[i],o)&&a.isArray(s[i])&&(s[i]=Ut(s[i])),!c)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(r,s)=>{t(Bt(r),s,n,0)}),n}return null}const _t={"Content-Type":void 0};function Lt(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const V={transitional:Ue,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s&&s?JSON.stringify(_e(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Ft(t,this.formSerializer).toString();if((c=a.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return M(c?{"files[]":t}:t,f&&new f,this.formSerializer)}}return o||s?(n.setContentType("application/json",!1),Lt(t)):t}],transformResponse:[function(t){const n=this.transitional||V.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(t&&a.isString(t)&&(r&&!this.responseType||s)){const i=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(c){if(i)throw c.name==="SyntaxError"?m.from(c,m.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:A.classes.FormData,Blob:A.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};a.forEach(["delete","get","head"],function(t){V.headers[t]={}});a.forEach(["post","put","patch"],function(t){V.headers[t]=a.merge(_t)});const oe=V,kt=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),jt=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),r=i.substring(s+1).trim(),!(!n||t[n]&&kt[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},pe=Symbol("internals");function C(e){return e&&String(e).trim().toLowerCase()}function k(e){return e===!1||e==null?e:a.isArray(e)?e.map(k):String(e)}function $t(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const It=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function v(e,t,n,r,s){if(a.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!a.isString(t)){if(a.isString(r))return t.indexOf(r)!==-1;if(a.isRegExp(r))return r.test(t)}}function zt(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Ht(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,o,i){return this[r].call(this,t,s,o,i)},configurable:!0})})}class W{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function o(c,f,u){const l=C(f);if(!l)throw new Error("header name must be a non-empty string");const p=a.findKey(s,l);(!p||s[p]===void 0||u===!0||u===void 0&&s[p]!==!1)&&(s[p||f]=k(c))}const i=(c,f)=>a.forEach(c,(u,l)=>o(u,l,f));return a.isPlainObject(t)||t instanceof this.constructor?i(t,n):a.isString(t)&&(t=t.trim())&&!It(t)?i(jt(t),n):t!=null&&o(n,t,r),this}get(t,n){if(t=C(t),t){const r=a.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return $t(s);if(a.isFunction(n))return n.call(this,s,r);if(a.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=C(t),t){const r=a.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||v(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function o(i){if(i=C(i),i){const c=a.findKey(r,i);c&&(!n||v(r,r[c],c,n))&&(delete r[c],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const o=n[r];(!t||v(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const n=this,r={};return a.forEach(this,(s,o)=>{const i=a.findKey(r,o);if(i){n[i]=k(s),delete n[o];return}const c=t?zt(o):String(o).trim();c!==o&&delete n[o],n[c]=k(s),r[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&a.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[pe]=this[pe]={accessors:{}}).accessors,s=this.prototype;function o(i){const c=C(i);r[c]||(Ht(s,i),r[c]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}}W.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.freezeMethods(W.prototype);a.freezeMethods(W);const N=W;function G(e,t){const n=this||oe,r=t||n,s=N.from(r.headers);let o=r.data;return a.forEach(e,function(c){o=c.call(n,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Le(e){return!!(e&&e.__CANCEL__)}function B(e,t,n){m.call(this,e??"canceled",m.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(B,m,{__CANCEL__:!0});function qt(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new m("Request failed with status code "+n.status,[m.ERR_BAD_REQUEST,m.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Jt=A.isStandardBrowserEnv?function(){return{write:function(n,r,s,o,i,c){const f=[];f.push(n+"="+encodeURIComponent(r)),a.isNumber(s)&&f.push("expires="+new Date(s).toGMTString()),a.isString(o)&&f.push("path="+o),a.isString(i)&&f.push("domain="+i),c===!0&&f.push("secure"),document.cookie=f.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Mt(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Vt(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function ke(e,t){return e&&!Mt(t)?Vt(e,t):t}const Wt=A.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function s(o){let i=o;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(i){const c=a.isString(i)?s(i):i;return c.protocol===r.protocol&&c.host===r.host}}():function(){return function(){return!0}}();function Kt(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function vt(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(f){const u=Date.now(),l=r[o];i||(i=u),n[s]=f,r[s]=u;let p=o,w=0;for(;p!==s;)w+=n[p++],p=p%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),u-i<t)return;const y=l&&u-l;return y?Math.round(w*1e3/y):void 0}}function he(e,t){let n=0;const r=vt(50,250);return s=>{const o=s.loaded,i=s.lengthComputable?s.total:void 0,c=o-n,f=r(c),u=o<=i;n=o;const l={loaded:o,total:i,progress:i?o/i:void 0,bytes:c,rate:f||void 0,estimated:f&&i&&u?(i-o)/f:void 0,event:s};l[t?"download":"upload"]=!0,e(l)}}const Gt=typeof XMLHttpRequest<"u",Xt=Gt&&function(e){return new Promise(function(n,r){let s=e.data;const o=N.from(e.headers).normalize(),i=e.responseType;let c;function f(){e.cancelToken&&e.cancelToken.unsubscribe(c),e.signal&&e.signal.removeEventListener("abort",c)}a.isFormData(s)&&(A.isStandardBrowserEnv||A.isStandardBrowserWebWorkerEnv?o.setContentType(!1):o.setContentType("multipart/form-data;",!1));let u=new XMLHttpRequest;if(e.auth){const y=e.auth.username||"",d=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(y+":"+d))}const l=ke(e.baseURL,e.url);u.open(e.method.toUpperCase(),Be(l,e.params,e.paramsSerializer),!0),u.timeout=e.timeout;function p(){if(!u)return;const y=N.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders()),h={data:!i||i==="text"||i==="json"?u.responseText:u.response,status:u.status,statusText:u.statusText,headers:y,config:e,request:u};qt(function(S){n(S),f()},function(S){r(S),f()},h),u=null}if("onloadend"in u?u.onloadend=p:u.onreadystatechange=function(){!u||u.readyState!==4||u.status===0&&!(u.responseURL&&u.responseURL.indexOf("file:")===0)||setTimeout(p)},u.onabort=function(){u&&(r(new m("Request aborted",m.ECONNABORTED,e,u)),u=null)},u.onerror=function(){r(new m("Network Error",m.ERR_NETWORK,e,u)),u=null},u.ontimeout=function(){let d=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const h=e.transitional||Ue;e.timeoutErrorMessage&&(d=e.timeoutErrorMessage),r(new m(d,h.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,u)),u=null},A.isStandardBrowserEnv){const y=(e.withCredentials||Wt(l))&&e.xsrfCookieName&&Jt.read(e.xsrfCookieName);y&&o.set(e.xsrfHeaderName,y)}s===void 0&&o.setContentType(null),"setRequestHeader"in u&&a.forEach(o.toJSON(),function(d,h){u.setRequestHeader(h,d)}),a.isUndefined(e.withCredentials)||(u.withCredentials=!!e.withCredentials),i&&i!=="json"&&(u.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&u.addEventListener("progress",he(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&u.upload&&u.upload.addEventListener("progress",he(e.onUploadProgress)),(e.cancelToken||e.signal)&&(c=y=>{u&&(r(!y||y.type?new B(null,e,u):y),u.abort(),u=null)},e.cancelToken&&e.cancelToken.subscribe(c),e.signal&&(e.signal.aborted?c():e.signal.addEventListener("abort",c)));const w=Kt(l);if(w&&A.protocols.indexOf(w)===-1){r(new m("Unsupported protocol "+w+":",m.ERR_BAD_REQUEST,e));return}u.send(s||null)})},j={http:At,xhr:Xt};a.forEach(j,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Qt={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let s=0;s<t&&(n=e[s],!(r=a.isString(n)?j[n.toLowerCase()]:n));s++);if(!r)throw r===!1?new m(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(a.hasOwnProp(j,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!a.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:j};function X(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new B(null,e)}function me(e){return X(e),e.headers=N.from(e.headers),e.data=G.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Qt.getAdapter(e.adapter||oe.adapter)(e).then(function(r){return X(e),r.data=G.call(e,e.transformResponse,r),r.headers=N.from(r.headers),r},function(r){return Le(r)||(X(e),r&&r.response&&(r.response.data=G.call(e,e.transformResponse,r.response),r.response.headers=N.from(r.response.headers))),Promise.reject(r)})}const ye=e=>e instanceof N?e.toJSON():e;function P(e,t){t=t||{};const n={};function r(u,l,p){return a.isPlainObject(u)&&a.isPlainObject(l)?a.merge.call({caseless:p},u,l):a.isPlainObject(l)?a.merge({},l):a.isArray(l)?l.slice():l}function s(u,l,p){if(a.isUndefined(l)){if(!a.isUndefined(u))return r(void 0,u,p)}else return r(u,l,p)}function o(u,l){if(!a.isUndefined(l))return r(void 0,l)}function i(u,l){if(a.isUndefined(l)){if(!a.isUndefined(u))return r(void 0,u)}else return r(void 0,l)}function c(u,l,p){if(p in t)return r(u,l);if(p in e)return r(void 0,u)}const f={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:c,headers:(u,l)=>s(ye(u),ye(l),!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(l){const p=f[l]||s,w=p(e[l],t[l],l);a.isUndefined(w)&&p!==c||(n[l]=w)}),n}const je="1.4.0",ie={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ie[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const we={};ie.transitional=function(t,n,r){function s(o,i){return"[Axios v"+je+"] Transitional option '"+o+"'"+i+(r?". "+r:"")}return(o,i,c)=>{if(t===!1)throw new m(s(i," has been removed"+(n?" in "+n:"")),m.ERR_DEPRECATED);return n&&!we[i]&&(we[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,i,c):!0}};function Yt(e,t,n){if(typeof e!="object")throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const o=r[s],i=t[o];if(i){const c=e[o],f=c===void 0||i(c,o,e);if(f!==!0)throw new m("option "+o+" must be "+f,m.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new m("Unknown option "+o,m.ERR_BAD_OPTION)}}const ee={assertOptions:Yt,validators:ie},T=ee.validators;class z{constructor(t){this.defaults=t,this.interceptors={request:new de,response:new de}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=P(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:o}=n;r!==void 0&&ee.assertOptions(r,{silentJSONParsing:T.transitional(T.boolean),forcedJSONParsing:T.transitional(T.boolean),clarifyTimeoutError:T.transitional(T.boolean)},!1),s!=null&&(a.isFunction(s)?n.paramsSerializer={serialize:s}:ee.assertOptions(s,{encode:T.function,serialize:T.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i;i=o&&a.merge(o.common,o[n.method]),i&&a.forEach(["delete","get","head","post","put","patch","common"],d=>{delete o[d]}),n.headers=N.concat(i,o);const c=[];let f=!0;this.interceptors.request.forEach(function(h){typeof h.runWhen=="function"&&h.runWhen(n)===!1||(f=f&&h.synchronous,c.unshift(h.fulfilled,h.rejected))});const u=[];this.interceptors.response.forEach(function(h){u.push(h.fulfilled,h.rejected)});let l,p=0,w;if(!f){const d=[me.bind(this),void 0];for(d.unshift.apply(d,c),d.push.apply(d,u),w=d.length,l=Promise.resolve(n);p<w;)l=l.then(d[p++],d[p++]);return l}w=c.length;let y=n;for(p=0;p<w;){const d=c[p++],h=c[p++];try{y=d(y)}catch(R){h.call(this,R);break}}try{l=me.call(this,y)}catch(d){return Promise.reject(d)}for(p=0,w=u.length;p<w;)l=l.then(u[p++],u[p++]);return l}getUri(t){t=P(this.defaults,t);const n=ke(t.baseURL,t.url);return Be(n,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){z.prototype[t]=function(n,r){return this.request(P(r||{},{method:t,url:n,data:(r||{}).data}))}});a.forEach(["post","put","patch"],function(t){function n(r){return function(o,i,c){return this.request(P(c||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}z.prototype[t]=n(),z.prototype[t+"Form"]=n(!0)});const $=z;class ae{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(s=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](s);r._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(c=>{r.subscribe(c),o=c}).then(s);return i.cancel=function(){r.unsubscribe(o)},i},t(function(o,i,c){r.reason||(r.reason=new B(o,i,c),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new ae(function(s){t=s}),cancel:t}}}const Zt=ae;function en(e){return function(n){return e.apply(null,n)}}function tn(e){return a.isObject(e)&&e.isAxiosError===!0}const te={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(te).forEach(([e,t])=>{te[t]=e});const nn=te;function $e(e){const t=new $(e),n=Se($.prototype.request,t);return a.extend(n,$.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return $e(P(e,s))},n}const E=$e(oe);E.Axios=$;E.CanceledError=B;E.CancelToken=Zt;E.isCancel=Le;E.VERSION=je;E.toFormData=M;E.AxiosError=m;E.Cancel=E.CanceledError;E.all=function(t){return Promise.all(t)};E.spread=en;E.isAxiosError=tn;E.mergeConfig=P;E.AxiosHeaders=N;E.formToJSON=e=>_e(a.isHTMLForm(e)?new FormData(e):e);E.HttpStatusCode=nn;E.default=E;const _=E,ne="text/event-stream";async function rn(e,t){const n=e.getReader();for(;;){const r=await n.read();if(r.done){t(new Uint8Array,!0);break}t(r.value)}}function sn(e){let t,n,r,s=!1;return function(i,c){if(c){e(i,0,!0);return}t===void 0?(t=i,n=0,r=-1):t=an(t,i);const f=t.length;let u=0;for(;n<f;){s&&(t[n]===10&&(u=++n),s=!1);let l=-1;for(;n<f&&l===-1;++n)switch(t[n]){case 58:r===-1&&(r=n-u);break;case 13:s=!0;case 10:l=n;break}if(l===-1)break;e(t.subarray(u,l),r),u=n,r=-1}u===f?t=void 0:u!==0&&(t=t.subarray(u),n-=u)}}function on(e,t,n){let r=Q();const s=new TextDecoder;return function(i,c,f){if(f){cn(r)||(e==null||e(r),r=Q());return}if(i.length===0)e==null||e(r),r=Q();else if(c>0){const u=s.decode(i.subarray(0,c)),l=c+(i[c+1]===32?2:1),p=s.decode(i.subarray(l));switch(u){case"data":r.data=r.data?r.data+`
`+p:p;break;case"event":r.event=p;break;case"id":t==null||t(r.id=p);break;case"retry":{const w=parseInt(p,10);Number.isNaN(w)||n==null||n(r.retry=w);break}}}}}function an(e,t){const n=new Uint8Array(e.length+t.length);return n.set(e),n.set(t,e.length),n}function Q(){return{data:"",event:"",id:"",retry:void 0}}function cn(e){return e.data===""&&e.event===""&&e.id===""&&e.retry===void 0}function un(e){try{return JSON.stringify(e)}catch{return e}}function ln(e,t,n){const{validateStatus:r}=n.config;!n.status||!r||r(n.status)?e(n):t(I(`Request failed with status code ${n.status} and body ${typeof n.data=="string"?n.data:un(n.data)}`,n.config,null,n.request,n))}function fn(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function dn(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function Ee(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function pn(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(En(t))r=t.toString();else{var s=[];be(t,function(c,f){c===null||typeof c>"u"||(Ie(c)?f=`${f}[]`:c=[c],be(c,function(l){wn(l)?l=l.toISOString():yn(l)&&(l=JSON.stringify(l)),s.push(`${Ee(f)}=${Ee(l)}`)}))}),r=s.join("&")}if(r){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+r}return e}function hn(e,t){return e&&!fn(t)?dn(e,t):t}function mn(e){return typeof e>"u"}function yn(e){return e!==null&&typeof e=="object"}function wn(e){return toString.call(e)==="[object Date]"}function En(e){return toString.call(e)==="[object URLSearchParams]"}function Ie(e){return Array.isArray(e)}function be(e,t){if(!(e===null||typeof e>"u"))if(typeof e!="object"&&(e=[e]),Ie(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}function bn(e){return toString.call(e)==="[object FormData]"}function Sn(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}async function Nn(e){const t=On(e),n=await An(t,e);return new Promise((r,s)=>{n instanceof Error?s(n):Object.prototype.toString.call(e.settle)==="[object Function]"?e.settle(r,s,n):ln(r,s,n)})}async function An(e,t){let n;try{n=await fetch(e)}catch(o){return o&&o.name==="AbortError"?I("Request aborted",t,"ECONNABORTED",e):o&&o.name==="TimeoutError"?I("Request timeout",t,"ECONNABORTED",e):I("Network Error",t,"ERR_NETWORK",e)}const r={};n.headers.forEach((o,i)=>{r[i]=o});const s={ok:n.ok,status:n.status,statusText:n.statusText,headers:r,config:t,request:e};if(n.status>=200&&n.status!==204)if(t.responseType==="stream"){const o=n.headers.get("content-type");if(!(o!=null&&o.startsWith(ne))){if(n.status>=400)return o!=null&&o.startsWith("application/json")?(s.data=await n.json(),s):(s.data=await n.text(),s);throw new Error(`Expected content-type to be ${ne}, Actual: ${o}`)}await rn(n.body,sn(on(t.onmessage)))}else switch(t.responseType){case"arraybuffer":s.data=await n.arrayBuffer();break;case"blob":s.data=await n.blob();break;case"json":s.data=await n.json();break;case"formData":s.data=await n.formData();break;default:s.data=await n.text();break}return s}function On(e){const t=new Headers(e.headers);if(e.auth){const i=e.auth.username||"",c=e.auth.password?decodeURI(encodeURIComponent(e.auth.password)):"";t.set("Authorization",`Basic ${btoa(`${i}:${c}`)}`)}const n=e.method.toUpperCase(),r={headers:t,method:n};n!=="GET"&&n!=="HEAD"&&(r.body=e.data,bn(r.body)&&Sn()&&t.delete("Content-Type")),typeof r.body=="string"&&(r.body=new TextEncoder().encode(r.body)),e.mode&&(r.mode=e.mode),e.cache&&(r.cache=e.cache),e.integrity&&(r.integrity=e.integrity),e.redirect&&(r.redirect=e.redirect),e.referrer&&(r.referrer=e.referrer),e.timeout&&e.timeout>0&&(r.signal=AbortSignal.timeout(e.timeout)),e.signal&&(r.signal=e.signal),mn(e.withCredentials)||(r.credentials=e.withCredentials?"include":"omit"),e.responseType==="stream"&&r.headers.set("Accept",ne);const s=hn(e.baseURL,e.url),o=pn(s,e.params,e.paramsSerializer);return new Request(o,r)}function I(e,t,n,r,s){if(_.AxiosError&&typeof _.AxiosError=="function")return new _.AxiosError(e,_.AxiosError[n],t,r,s);const o=new Error(e);return Rn(o,t,n,r,s)}function Rn(e,t,n,r,s){return e.config=t,n&&(e.code=n),e.request=r,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}function Tn(e){const{azureOpenAIApiDeploymentName:t,azureOpenAIApiInstanceName:n,azureOpenAIApiKey:r,azureOpenAIBasePath:s,basePath:o}=e;if(r&&s&&t)return`${s}/${t}`;if(r){if(!n)throw new Error("azureOpenAIApiInstanceName is required when using azureOpenAIApiKey");if(!t)throw new Error("azureOpenAIApiDeploymentName is a required parameter when using azureOpenAIApiKey");return`https://${n}.openai.azure.com/openai/deployments/${t}`}return o}export{Nn as f,Tn as g};
