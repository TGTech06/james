import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import "langchain/chains";
import "langchain/memory";
import "langchain/llms/hf";
import "langchain/embeddings/openai";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/hf";
import "langchain/vectorstores/memory";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".form-control.s-uhtJAkW7ZDek label.s-uhtJAkW7ZDek{font-size:1rem}.form-control.s-uhtJAkW7ZDek span.s-uhtJAkW7ZDek{font-size:0.75rem}#displayTextContainer.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{white-space:pre-wrap}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let temperature = 0.2;
  let responseText = "";
  $$result.css.add(css);
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col min-h-screen bg-gray-900 text-white p-4"><div class="flex flex-col items-center"><nav class="w-full bg-gray-900 rounded-lg mb-6 shadow-md"><div class="navbar p-4 bg-gray-900 text-white rounded-t-lg rounded-b-lg border border-white"><div class="flex items-center justify-center flex-1"><a href="/" class="text-3xl font-bold hover:text-blue-400 cursor-pointer" data-svelte-h="svelte-1da30rr">James 🧠🧠</a></div> <div class="flex items-center justify-center flex-1 space-x-4"><a href="/upload" class="text-lg text-white hover:text-blue-400" data-svelte-h="svelte-8kva0r">Upload Data</a> <a href="/ask" class="text-lg text-white hover:text-blue-400" data-svelte-h="svelte-1i5p5cg">Chat with James</a> <a href="/profile" class="text-lg text-white hover:text-blue-400" data-svelte-h="svelte-3pkr3">Profile</a> </div></div></nav> <div class="grid grid-cols-12 min-h-screen gap-4 bg-gray-900 text-white p-8"> <div class="col-span-3 bg-gray-800 rounded-lg p-4"><h2 class="text-2xl font-bold mb-4" data-svelte-h="svelte-1ali85g">Configuration</h2> <p class="mb-4" data-svelte-h="svelte-3ou3j6">Choose your model and temperature for asking questions.</p> <div class="form-control s-uhtJAkW7ZDek"><label for="model" class="s-uhtJAkW7ZDek" data-svelte-h="svelte-6cjlpw">Model</label> <select id="model" class="input input-primary"><option value="tiiuae/falcon-7b-instruct" data-svelte-h="svelte-h4r1ny">tiiuae/falcon-7b-instruct</option><option value="meta-llama/Llama-2-70b-chat-hf" data-svelte-h="svelte-153lf52">meta-llama/Llama-2-70b-chat-hf</option><option value="OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5" data-svelte-h="svelte-1ww46wk">OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5</option></select></div> <div class="form-control mt-4 s-uhtJAkW7ZDek"><label for="temperature" class="s-uhtJAkW7ZDek" data-svelte-h="svelte-11sobei">Temperature</label> <input type="range" id="temperature" min="0.1" max="1.0" step="0.2" class="input input-primary"${add_attribute("value", temperature, 0)}> <span class="text-sm ml-2 s-uhtJAkW7ZDek">${escape(temperature)}</span></div></div>  <div class="col-span-9"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-1m9568">Ask AI Page</h1> <div class="form-control mb-4 s-uhtJAkW7ZDek"><label for="question" class="label s-uhtJAkW7ZDek" data-svelte-h="svelte-20y8o">Your Question</label> <textarea id="question" class="textarea textarea-primary">${escape("")}</textarea></div> <button class="btn btn-primary mb-4" data-svelte-h="svelte-1uenov6">Ask the AI</button>  <div class="bg-gray-800 p-4 rounded-lg"><p class="text-xl mb-2" data-svelte-h="svelte-1th80ox">Generated Text:</p> <div id="displayTextContainer" class="text-gray-200 s-uhtJAkW7ZDek">${escape(responseText)}</div></div></div></div></div></div>`;
    }
  })}`;
});
export {
  Page as default
};
