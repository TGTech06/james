import { c as create_ssr_component, i as is_promise, n as noop, a as validate_store, b as subscribe, v as validate_component } from "../../chunks/ssr.js";
import "langchain/text_splitter";
import "langchain/embeddings/hf";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/openai";
import "langchain/document_loaders/fs/text";
import "langchain/document_loaders/fs/unstructured";
import "fs";
import { w as writable } from "../../chunks/index2.js";
import "langchain/chains";
import "langchain/memory";
import "langchain/llms/hf";
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_chunkSize;
  let $$unsubscribe_chunkOverlap;
  let $$unsubscribe_model;
  let $$unsubscribe_temperature;
  let model = writable("tiiuae/falcon-7b-instruct");
  validate_store(model, "model");
  $$unsubscribe_model = subscribe(model, (value) => value);
  let temperature = writable(0.2);
  validate_store(temperature, "temperature");
  $$unsubscribe_temperature = subscribe(temperature, (value) => value);
  let chunkSize = writable(500);
  validate_store(chunkSize, "chunkSize");
  $$unsubscribe_chunkSize = subscribe(chunkSize, (value) => value);
  let chunkOverlap = writable(0);
  validate_store(chunkOverlap, "chunkOverlap");
  $$unsubscribe_chunkOverlap = subscribe(chunkOverlap, (value) => value);
  $$unsubscribe_chunkSize();
  $$unsubscribe_chunkOverlap();
  $$unsubscribe_model();
  $$unsubscribe_temperature();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="app-container"><div class="app-header"><h1 data-svelte-h="svelte-la326">🧠🧠 James 🧠🧠</h1> <p data-svelte-h="svelte-101ewg4">He will remember everything you tell him and answer your questions.
        (Please let me know if I have to discipline him. He&#39;s still learning,
        and any feedback is welcome!)</p></div> <div class="app-content"> <div class="action-selection"><input type="radio" value="Add Knowledge" id="add-knowledge"${""}> <label for="add-knowledge" data-svelte-h="svelte-112aynz">Add Knowledge</label> <input type="radio" value="Chat with your Brain" id="chat-with-brain"${""}> <label for="chat-with-brain" data-svelte-h="svelte-41acxd">Chat with your Brain</label> <input type="radio" value="Forget" id="forget"${""}> <label for="forget" data-svelte-h="svelte-1h6y6ie">Forget</label></div> ${`${`${``}`}`}</div></div> <button class="btn btn-secondary" data-svelte-h="svelte-1hqql7h">Logout</button>`;
    }
  })}`;
});
export {
  Page as default
};
