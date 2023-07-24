import { c as create_ssr_component, i as is_promise, n as noop, e as escape, b as add_attribute, d as each, v as validate_store, a as subscribe, f as validate_component } from "../../chunks/ssr.js";
import "langchain/text_splitter";
import "langchain/embeddings/hf";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/openai";
import "pdfjs-dist";
import "langchain/document_loaders/fs/text";
import "langchain/document_loaders/fs/pdf";
import "langchain/document_loaders/fs/unstructured";
import "fs";
import { w as writable } from "../../chunks/index2.js";
import "langchain/chains";
import "langchain/memory";
import "langchain/llms/hf";
import "langchain/vectorstores/memory";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_KEY } from "../../chunks/public.js";
const AuthCheck = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  const getSessionData = async () => {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) {
      console.log(error);
      return null;
    }
    return session;
  };
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <p data-svelte-h="svelte-qdsr2u">Loading...</p> `;
    }
    return function(session) {
      return ` ${session?.user ? `${slots.default ? slots.default({}) : ``}` : `<p class="text-center text-danger" data-svelte-h="svelte-b4gom2">You must be signed in to view this page</p> <div class="auth-buttons"><a href="/login" class="btn btn-primary" data-svelte-h="svelte-f0ojl5">Login</a> <a href="/register" class="btn btn-secondary" data-svelte-h="svelte-ruuhj7">Register</a></div>`} `;
    }(__value);
  }(getSessionData())}`;
});
const Insert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-1vcag86">Insert Data Page</h1>      <input type="file" multiple> <button class="btn btn-primary" data-svelte-h="svelte-f8f4q8">Upload Files</button>  <textarea>${escape("")}</textarea> <button class="btn btn-primary" data-svelte-h="svelte-13phmmf">Add the URL to the database</button>`;
});
const Ask = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let temperature = 0.2;
  let responseText = "";
  return `<h1 data-svelte-h="svelte-1437n1q">Ask AI Page</h1>      <div class="sidebar"><h2 data-svelte-h="svelte-bx2tqs">Configuration</h2> <p data-svelte-h="svelte-1o6n24x">Choose your model and temperature for asking questions.</p> <div class="select"><label for="model" data-svelte-h="svelte-6cjlpw">Model</label> <select id="model"><option value="tiiuae/falcon-7b-instruct" data-svelte-h="svelte-127dbi">tiiuae/falcon-7b-instruct</option><option value="meta-llama/Llama-2-70b-chat-hf" data-svelte-h="svelte-o56go6">meta-llama/Llama-2-70b-chat-hf</option><option value="OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5" data-svelte-h="svelte-1dmn20k">OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5</option></select></div> <div class="slider"><label for="temperature" data-svelte-h="svelte-11sobei">Temperature</label> <input type="range" id="temperature" min="0.1" max="1.0" step="0.2"${add_attribute("value", temperature, 0)}> <span>${escape(temperature)}</span></div></div>  <div class="content"><textarea>${escape("")}</textarea> <button class="btn btn-primary" data-svelte-h="svelte-2njyz8">Ask the AI</button></div>  <p data-svelte-h="svelte-50blvq">Generated Text:</p> <div id="displayTextContainer">${escape(responseText)}</div>`;
});
const Forget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let documents = [];
  return `<h1 data-svelte-h="svelte-c8jpi6">Forget Data Page</h1> <div id="displayTextContainer">${each(documents, (document) => {
    return `<p><strong>${escape(document.name)}</strong> (${escape(document.size)} bytes)
      <button data-svelte-h="svelte-141b94n">❌</button> </p>`;
  })}</div>    `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mode, $$unsubscribe_mode;
  let mode = writable("Add Knowledge");
  validate_store(mode, "mode");
  $$unsubscribe_mode = subscribe(mode, (value) => $mode = value);
  $$unsubscribe_mode();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="app-container"><div class="app-header"><h1 data-svelte-h="svelte-la326">🧠🧠 James 🧠🧠</h1> <p data-svelte-h="svelte-101ewg4">He will remember everything you tell him and answer your questions.
        (Please let me know if I have to discipline him. He&#39;s still learning,
        and any feedback is welcome!)</p></div>  ${$mode === "Add Knowledge" ? `${validate_component(Insert, "Insert").$$render($$result, {}, {}, {})}` : `${$mode === "Chat with your Brain" ? `${validate_component(Ask, "Ask").$$render($$result, {}, {}, {})}` : `${$mode === "Forget" ? `${validate_component(Forget, "Forget").$$render($$result, {}, {}, {})}` : ``}`}`}  <div><button data-svelte-h="svelte-b01iaa">Go to Add Knowledge</button> <button data-svelte-h="svelte-1rqvkvu">Go to Chat with your Brain</button> <button data-svelte-h="svelte-1ofczm0">Go to Forget</button></div></div> <button class="btn btn-secondary" data-svelte-h="svelte-1hqql7h">Logout</button>`;
    }
  })} `;
});
export {
  Page as default
};
