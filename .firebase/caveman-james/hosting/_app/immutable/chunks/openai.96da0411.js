import{g as s,i as K,j as L,k as j,l as k,m as x}from"./NavBar.28f036ee.js";import{a as M,b as D,c as B}from"./3.4b8c3bf3.js";import{p as R}from"./prompt-layer.00daf386.js";class C extends M{get callKeys(){return[...super.callKeys,"options","promptIndex"]}get lc_secrets(){return{openAIApiKey:"OPENAI_API_KEY",azureOpenAIApiKey:"AZURE_OPENAI_API_KEY"}}get lc_aliases(){return{modelName:"model",openAIApiKey:"openai_api_key",azureOpenAIApiVersion:"azure_openai_api_version",azureOpenAIApiKey:"azure_openai_api_key",azureOpenAIApiInstanceName:"azure_openai_api_instance_name",azureOpenAIApiDeploymentName:"azure_openai_api_deployment_name"}}constructor(e,t){if(super(e??{}),Object.defineProperty(this,"lc_serializable",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"temperature",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(this,"topP",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(this,"frequencyPenalty",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"presencePenalty",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"n",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(this,"logitBias",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"maxTokens",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"modelName",{enumerable:!0,configurable:!0,writable:!0,value:"gpt-3.5-turbo"}),Object.defineProperty(this,"prefixMessages",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"modelKwargs",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"timeout",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"stop",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"streaming",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"openAIApiKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiVersion",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiInstanceName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiDeploymentName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIBasePath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientConfig",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.openAIApiKey=(e==null?void 0:e.openAIApiKey)??s("OPENAI_API_KEY"),this.azureOpenAIApiKey=(e==null?void 0:e.azureOpenAIApiKey)??s("AZURE_OPENAI_API_KEY"),!this.azureOpenAIApiKey&&!this.openAIApiKey)throw new Error("OpenAI or Azure OpenAI API key not found");if(this.azureOpenAIApiInstanceName=(e==null?void 0:e.azureOpenAIApiInstanceName)??s("AZURE_OPENAI_API_INSTANCE_NAME"),this.azureOpenAIApiDeploymentName=((e==null?void 0:e.azureOpenAIApiCompletionsDeploymentName)||(e==null?void 0:e.azureOpenAIApiDeploymentName))??(s("AZURE_OPENAI_API_COMPLETIONS_DEPLOYMENT_NAME")||s("AZURE_OPENAI_API_DEPLOYMENT_NAME")),this.azureOpenAIApiVersion=(e==null?void 0:e.azureOpenAIApiVersion)??s("AZURE_OPENAI_API_VERSION"),this.azureOpenAIBasePath=(e==null?void 0:e.azureOpenAIBasePath)??s("AZURE_OPENAI_BASE_PATH"),this.modelName=(e==null?void 0:e.modelName)??this.modelName,this.prefixMessages=(e==null?void 0:e.prefixMessages)??this.prefixMessages,this.modelKwargs=(e==null?void 0:e.modelKwargs)??{},this.timeout=e==null?void 0:e.timeout,this.temperature=(e==null?void 0:e.temperature)??this.temperature,this.topP=(e==null?void 0:e.topP)??this.topP,this.frequencyPenalty=(e==null?void 0:e.frequencyPenalty)??this.frequencyPenalty,this.presencePenalty=(e==null?void 0:e.presencePenalty)??this.presencePenalty,this.n=(e==null?void 0:e.n)??this.n,this.logitBias=e==null?void 0:e.logitBias,this.maxTokens=e==null?void 0:e.maxTokens,this.stop=e==null?void 0:e.stop,this.streaming=(e==null?void 0:e.streaming)??!1,this.n>1)throw new Error("Cannot use n > 1 in OpenAIChat LLM. Use ChatOpenAI Chat Model instead.");if(this.azureOpenAIApiKey){if(!this.azureOpenAIApiInstanceName)throw new Error("Azure OpenAI API instance name not found");if(!this.azureOpenAIApiDeploymentName)throw new Error("Azure OpenAI API deployment name not found");if(!this.azureOpenAIApiVersion)throw new Error("Azure OpenAI API version not found")}this.clientConfig={apiKey:this.openAIApiKey,...t,...e==null?void 0:e.configuration}}invocationParams(e){return{model:this.modelName,temperature:this.temperature,top_p:this.topP,frequency_penalty:this.frequencyPenalty,presence_penalty:this.presencePenalty,n:this.n,logit_bias:this.logitBias,max_tokens:this.maxTokens===-1?void 0:this.maxTokens,stop:(e==null?void 0:e.stop)??this.stop,stream:this.streaming,...this.modelKwargs}}_identifyingParams(){return{model_name:this.modelName,...this.invocationParams(),...this.clientConfig}}identifyingParams(){return{model_name:this.modelName,...this.invocationParams(),...this.clientConfig}}formatMessages(e){const t={role:"user",content:e};return this.prefixMessages?[...this.prefixMessages,t]:[t]}async _call(e,t,r){var a;const n=this.invocationParams(t);return((a=(n.stream?await new Promise((m,P)=>{let i,u=!1,A=!1;this.completionWithRetry({...n,messages:this.formatMessages(e)},{signal:t.signal,...t.options,adapter:K,responseType:"stream",onmessage:I=>{var g,v,z,y,_,l;if(((v=(g=I.data)==null?void 0:g.trim)==null?void 0:v.call(g))==="[DONE]"){if(A||u)return;A=!0,m(i)}else{const b=JSON.parse(I.data);if(b!=null&&b.error){if(u)return;u=!0,P(b.error);return}const h=b;i||(i={id:h.id,object:h.object,created:h.created,model:h.model,choices:[]});for(const p of h.choices)if(p!=null){let O=i.choices.find(w=>w.index===p.index);O||(O={index:p.index,finish_reason:p.finish_reason??void 0},i.choices.push(O)),O.message||(O.message={role:(z=p.delta)==null?void 0:z.role,content:((y=p.delta)==null?void 0:y.content)??""}),O.message.content+=((_=p.delta)==null?void 0:_.content)??"",r==null||r.handleLLMNewToken(((l=p.delta)==null?void 0:l.content)??"",{prompt:t.promptIndex??0,completion:p.index})}!A&&!u&&h.choices.every(p=>p.finish_reason!=null)&&(A=!0,m(i))}}}).catch(I=>{u||(u=!0,P(I))})}):await this.completionWithRetry({...n,messages:this.formatMessages(e)},{signal:t.signal,...t.options})).choices[0].message)==null?void 0:a.content)??""}async completionWithRetry(e,t){if(!this.client){const n={azureOpenAIApiDeploymentName:this.azureOpenAIApiDeploymentName,azureOpenAIApiInstanceName:this.azureOpenAIApiInstanceName,azureOpenAIApiKey:this.azureOpenAIApiKey,azureOpenAIBasePath:this.azureOpenAIBasePath,basePath:this.clientConfig.basePath},o=L(n),a=new j.Configuration({...this.clientConfig,basePath:o,baseOptions:{timeout:this.timeout,...this.clientConfig.baseOptions}});this.client=new j.OpenAIApi(a)}const r={adapter:k()?void 0:K,...this.clientConfig.baseOptions,...t};return this.azureOpenAIApiKey&&(r.headers={"api-key":this.azureOpenAIApiKey,...r.headers},r.params={"api-version":this.azureOpenAIApiVersion,...r.params}),this.caller.call(this.client.createChatCompletion.bind(this.client),e,r).then(n=>n.data)}_llmType(){return"openai"}}class V extends C{get lc_secrets(){return{promptLayerApiKey:"PROMPTLAYER_API_KEY"}}constructor(e){if(super(e),Object.defineProperty(this,"lc_serializable",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"promptLayerApiKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"plTags",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"returnPromptLayerId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.plTags=(e==null?void 0:e.plTags)??[],this.returnPromptLayerId=(e==null?void 0:e.returnPromptLayerId)??!1,this.promptLayerApiKey=(e==null?void 0:e.promptLayerApiKey)??s("PROMPTLAYER_API_KEY"),!this.promptLayerApiKey)throw new Error("Missing PromptLayer API key")}async completionWithRetry(e,t){return e.stream?super.completionWithRetry(e,t):await super.completionWithRetry(e)}async _generate(e,t,r){let n;return{generations:await Promise.all(e.map(async a=>{const m=Date.now(),P=await this._call(a,t,r),i=Date.now();n=[{text:P}];const u={text:P},A=await R(this.caller,"langchain.PromptLayerOpenAIChat",[a],this._identifyingParams(),this.plTags,u,m,i,this.promptLayerApiKey);return this.returnPromptLayerId===!0&&A.success===!0&&(n[0].generationInfo={promptLayerRequestId:A.request_id}),n}))}}}class Y extends D{get callKeys(){return[...super.callKeys,"options"]}get lc_secrets(){return{openAIApiKey:"OPENAI_API_KEY",azureOpenAIApiKey:"AZURE_OPENAI_API_KEY"}}get lc_aliases(){return{modelName:"model",openAIApiKey:"openai_api_key",azureOpenAIApiVersion:"azure_openai_api_version",azureOpenAIApiKey:"azure_openai_api_key",azureOpenAIApiInstanceName:"azure_openai_api_instance_name",azureOpenAIApiDeploymentName:"azure_openai_api_deployment_name"}}constructor(e,t){var r,n,o;if((r=e==null?void 0:e.modelName)!=null&&r.startsWith("gpt-3.5-turbo")||(n=e==null?void 0:e.modelName)!=null&&n.startsWith("gpt-4")||(o=e==null?void 0:e.modelName)!=null&&o.startsWith("gpt-4-32k"))return new C(e,t);if(super(e??{}),Object.defineProperty(this,"lc_serializable",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"temperature",{enumerable:!0,configurable:!0,writable:!0,value:.7}),Object.defineProperty(this,"maxTokens",{enumerable:!0,configurable:!0,writable:!0,value:256}),Object.defineProperty(this,"topP",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(this,"frequencyPenalty",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"presencePenalty",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"n",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(this,"bestOf",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"logitBias",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"modelName",{enumerable:!0,configurable:!0,writable:!0,value:"text-davinci-003"}),Object.defineProperty(this,"modelKwargs",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"batchSize",{enumerable:!0,configurable:!0,writable:!0,value:20}),Object.defineProperty(this,"timeout",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"stop",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"streaming",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"openAIApiKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiVersion",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiInstanceName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIApiDeploymentName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"azureOpenAIBasePath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"client",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientConfig",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.openAIApiKey=(e==null?void 0:e.openAIApiKey)??s("OPENAI_API_KEY"),this.azureOpenAIApiKey=(e==null?void 0:e.azureOpenAIApiKey)??s("AZURE_OPENAI_API_KEY"),!this.azureOpenAIApiKey&&!this.openAIApiKey)throw new Error("OpenAI or Azure OpenAI API key not found");if(this.azureOpenAIApiInstanceName=(e==null?void 0:e.azureOpenAIApiInstanceName)??s("AZURE_OPENAI_API_INSTANCE_NAME"),this.azureOpenAIApiDeploymentName=((e==null?void 0:e.azureOpenAIApiCompletionsDeploymentName)||(e==null?void 0:e.azureOpenAIApiDeploymentName))??(s("AZURE_OPENAI_API_COMPLETIONS_DEPLOYMENT_NAME")||s("AZURE_OPENAI_API_DEPLOYMENT_NAME")),this.azureOpenAIApiVersion=(e==null?void 0:e.azureOpenAIApiVersion)??s("AZURE_OPENAI_API_VERSION"),this.azureOpenAIBasePath=(e==null?void 0:e.azureOpenAIBasePath)??s("AZURE_OPENAI_BASE_PATH"),this.modelName=(e==null?void 0:e.modelName)??this.modelName,this.modelKwargs=(e==null?void 0:e.modelKwargs)??{},this.batchSize=(e==null?void 0:e.batchSize)??this.batchSize,this.timeout=e==null?void 0:e.timeout,this.temperature=(e==null?void 0:e.temperature)??this.temperature,this.maxTokens=(e==null?void 0:e.maxTokens)??this.maxTokens,this.topP=(e==null?void 0:e.topP)??this.topP,this.frequencyPenalty=(e==null?void 0:e.frequencyPenalty)??this.frequencyPenalty,this.presencePenalty=(e==null?void 0:e.presencePenalty)??this.presencePenalty,this.n=(e==null?void 0:e.n)??this.n,this.bestOf=(e==null?void 0:e.bestOf)??this.bestOf,this.logitBias=e==null?void 0:e.logitBias,this.stop=e==null?void 0:e.stop,this.streaming=(e==null?void 0:e.streaming)??!1,this.streaming&&this.bestOf&&this.bestOf>1)throw new Error("Cannot stream results when bestOf > 1");if(this.azureOpenAIApiKey){if(!this.azureOpenAIApiInstanceName)throw new Error("Azure OpenAI API instance name not found");if(!this.azureOpenAIApiDeploymentName)throw new Error("Azure OpenAI API deployment name not found");if(!this.azureOpenAIApiVersion)throw new Error("Azure OpenAI API version not found")}this.clientConfig={apiKey:this.openAIApiKey,...t,...e==null?void 0:e.configuration}}invocationParams(e){return{model:this.modelName,temperature:this.temperature,max_tokens:this.maxTokens,top_p:this.topP,frequency_penalty:this.frequencyPenalty,presence_penalty:this.presencePenalty,n:this.n,best_of:this.bestOf,logit_bias:this.logitBias,stop:(e==null?void 0:e.stop)??this.stop,stream:this.streaming,...this.modelKwargs}}_identifyingParams(){return{model_name:this.modelName,...this.invocationParams(),...this.clientConfig}}identifyingParams(){return this._identifyingParams()}async _generate(e,t,r){const n=x(e,this.batchSize),o=[],a={},m=this.invocationParams(t);if(m.max_tokens===-1){if(e.length!==1)throw new Error("max_tokens set to -1 not supported for multiple inputs");m.max_tokens=await B({prompt:e[0],modelName:this.modelName})}for(let i=0;i<n.length;i+=1){const u=m.stream?await new Promise((v,z)=>{const y=[];let _,l=!1,b=!1;this.completionWithRetry({...m,prompt:n[i]},{signal:t.signal,...t.options,adapter:K,responseType:"stream",onmessage:h=>{var p,O;if(((O=(p=h.data)==null?void 0:p.trim)==null?void 0:O.call(p))==="[DONE]"){if(b||l)return;b=!0,v({..._,choices:y})}else{const w=JSON.parse(h.data);if(w!=null&&w.error){if(l)return;l=!0,z(w.error);return}const N=w;_||(_={id:N.id,object:N.object,created:N.created,model:N.model});for(const c of N.choices)if(c!=null&&c.index!=null){y[c.index]||(y[c.index]={});const E=y[c.index];E.text=(E.text??"")+(c.text??""),E.finish_reason=c.finish_reason,E.logprobs=c.logprobs,r==null||r.handleLLMNewToken(c.text??"",{prompt:Math.floor(c.index/this.n),completion:c.index%this.n})}!b&&!l&&y.every(c=>c.finish_reason!=null)&&(b=!0,v({..._,choices:y}))}}}).catch(h=>{l||(l=!0,z(h))})}):await this.completionWithRetry({...m,prompt:n[i]},{signal:t.signal,...t.options});o.push(...u.choices);const{completion_tokens:A,prompt_tokens:I,total_tokens:g}=u.usage??{};A&&(a.completionTokens=(a.completionTokens??0)+A),I&&(a.promptTokens=(a.promptTokens??0)+I),g&&(a.totalTokens=(a.totalTokens??0)+g)}return{generations:x(o,this.n).map(i=>i.map(u=>({text:u.text??"",generationInfo:{finishReason:u.finish_reason,logprobs:u.logprobs}}))),llmOutput:{tokenUsage:a}}}async completionWithRetry(e,t){if(!this.client){const n={azureOpenAIApiDeploymentName:this.azureOpenAIApiDeploymentName,azureOpenAIApiInstanceName:this.azureOpenAIApiInstanceName,azureOpenAIApiKey:this.azureOpenAIApiKey,azureOpenAIBasePath:this.azureOpenAIBasePath,basePath:this.clientConfig.basePath},o=L(n),a=new j.Configuration({...this.clientConfig,basePath:o,baseOptions:{timeout:this.timeout,...this.clientConfig.baseOptions}});this.client=new j.OpenAIApi(a)}const r={adapter:k()?void 0:K,...this.clientConfig.baseOptions,...t};return this.azureOpenAIApiKey&&(r.headers={"api-key":this.azureOpenAIApiKey,...r.headers},r.params={"api-version":this.azureOpenAIApiVersion,...r.params}),this.caller.call(this.client.createCompletion.bind(this.client),e,r).then(n=>n.data)}_llmType(){return"openai"}}class W extends Y{get lc_secrets(){return{promptLayerApiKey:"PROMPTLAYER_API_KEY"}}constructor(e){if(super(e),Object.defineProperty(this,"lc_serializable",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"promptLayerApiKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"plTags",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"returnPromptLayerId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.plTags=(e==null?void 0:e.plTags)??[],this.promptLayerApiKey=(e==null?void 0:e.promptLayerApiKey)??s("PROMPTLAYER_API_KEY"),this.returnPromptLayerId=e==null?void 0:e.returnPromptLayerId,!this.promptLayerApiKey)throw new Error("Missing PromptLayer API key")}async completionWithRetry(e,t){return e.stream?super.completionWithRetry(e,t):await super.completionWithRetry(e)}async _generate(e,t,r){const n=Date.now(),o=await super._generate(e,t,r);for(let a=0;a<o.generations.length;a+=1){const m=Date.now(),P={text:o.generations[a][0].text,llm_output:o.llmOutput},i=await R(this.caller,"langchain.PromptLayerOpenAI",[e[a]],this._identifyingParams(),this.plTags,P,n,m,this.promptLayerApiKey);let u;this.returnPromptLayerId===!0&&(i&&i.success===!0&&(u=i.request_id),o.generations[a][0].generationInfo={...o.generations[a][0].generationInfo,promptLayerRequestId:u})}return o}}export{Y as OpenAI,C as OpenAIChat,W as PromptLayerOpenAI,V as PromptLayerOpenAIChat};
