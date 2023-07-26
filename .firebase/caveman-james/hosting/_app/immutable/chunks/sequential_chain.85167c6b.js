import{d as h}from"./question.dcf756cc.js";function y(a,e){const t=new Set;for(const i of e)a.has(i)&&t.add(i);return t}function w(a,e){const t=new Set(a);for(const i of e)t.add(i);return t}function c(a,e){const t=new Set(a);for(const i of e)t.delete(i);return t}function l(a){return Array.from(a).map(e=>`"${e}"`).join(", ")}class b extends h{get inputKeys(){return this.inputVariables}get outputKeys(){return this.outputVariables}constructor(e){if(super(e),Object.defineProperty(this,"chains",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"inputVariables",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"outputVariables",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"returnAll",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.chains=e.chains,this.inputVariables=e.inputVariables,this.outputVariables=e.outputVariables??[],this.outputVariables.length>0&&e.returnAll)throw new Error("Either specify variables to return using `outputVariables` or use `returnAll` param. Cannot apply both conditions at the same time.");this.returnAll=e.returnAll??!1,this._validateChains()}_validateChains(){var o;if(this.chains.length===0)throw new Error("Sequential chain must have at least one chain.");const e=((o=this.memory)==null?void 0:o.memoryKeys)??[],t=new Set(this.inputKeys),i=new Set(e),r=y(t,i);if(r.size>0)throw new Error(`The following keys: ${l(r)} are overlapping between memory and input keys of the chain variables. This can lead to unexpected behaviour. Please use input and memory keys that don't overlap.`);const s=w(t,i);for(const n of this.chains){const u=c(new Set(n.inputKeys),s);if(u.size>0)throw new Error(`Missing variables for chain "${n._chainType()}": ${l(u)}. Only got the following variables: ${l(s)}.`);const p=new Set(n.outputKeys),f=y(s,p);if(f.size>0)throw new Error(`The following output variables for chain "${n._chainType()}" are overlapping: ${l(f)}. This can lead to unexpected behaviour.`);for(const m of p)s.add(m)}if(this.outputVariables.length===0)if(this.returnAll){const n=c(s,t);this.outputVariables=Array.from(n)}else this.outputVariables=this.chains[this.chains.length-1].outputKeys;else{const n=c(new Set(this.outputVariables),new Set(s));if(n.size>0)throw new Error(`The following output variables were expected to be in the final chain output but were not found: ${l(n)}.`)}}async _call(e,t){let i={};const r=e;let s=0;for(const n of this.chains){s+=1,i=await n.call(r,t==null?void 0:t.getChild(`step_${s}`));for(const u of Object.keys(i))r[u]=i[u]}const o={};for(const n of this.outputVariables)o[n]=r[n];return o}_chainType(){return"sequential_chain"}static async deserialize(e){const t=[],i=e.input_variables,r=e.output_variables,s=e.chains;for(const o of s){const n=await h.deserialize(o);t.push(n)}return new b({chains:t,inputVariables:i,outputVariables:r})}serialize(){const e=[];for(const t of this.chains)e.push(t.serialize());return{_type:this._chainType(),input_variables:this.inputVariables,output_variables:this.outputVariables,chains:e}}}class d extends h{get inputKeys(){return[this.inputKey]}get outputKeys(){return[this.outputKey]}constructor(e){super(e),Object.defineProperty(this,"chains",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"inputKey",{enumerable:!0,configurable:!0,writable:!0,value:"input"}),Object.defineProperty(this,"outputKey",{enumerable:!0,configurable:!0,writable:!0,value:"output"}),Object.defineProperty(this,"trimOutputs",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.chains=e.chains,this.trimOutputs=e.trimOutputs??!1,this._validateChains()}_validateChains(){for(const e of this.chains){if(e.inputKeys.filter(t=>{var i;return!((i=e.memory)!=null&&i.memoryKeys.includes(t))}).length!==1)throw new Error(`Chains used in SimpleSequentialChain should all have one input, got ${e.inputKeys.length} for ${e._chainType()}.`);if(e.outputKeys.length!==1)throw new Error(`Chains used in SimpleSequentialChain should all have one output, got ${e.outputKeys.length} for ${e._chainType()}.`)}}async _call(e,t){let i=e[this.inputKey],r=0;for(const s of this.chains)r+=1,i=(await s.call({[s.inputKeys[0]]:i,signal:e.signal},t==null?void 0:t.getChild(`step_${r}`)))[s.outputKeys[0]],this.trimOutputs&&(i=i.trim()),await(t==null?void 0:t.handleText(i));return{[this.outputKey]:i}}_chainType(){return"simple_sequential_chain"}static async deserialize(e){const t=[],i=e.chains;for(const r of i){const s=await h.deserialize(r);t.push(s)}return new d({chains:t})}serialize(){const e=[];for(const t of this.chains)e.push(t.serialize());return{_type:this._chainType(),chains:e}}}export{b as SequentialChain,d as SimpleSequentialChain};
