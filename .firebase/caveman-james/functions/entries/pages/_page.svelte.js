import { c as create_ssr_component, a as validate_store, b as subscribe } from "../../chunks/ssr.js";
import "langchain/text_splitter";
import "langchain/embeddings/hf";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/openai";
import "langchain/document_loaders/fs/text";
import "langchain/document_loaders/fs/unstructured";
import "axios";
import "fs";
import { w as writable } from "../../chunks/index.js";
import "langchain/chains";
import "langchain/memory";
import "langchain/llms/hf";
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
  return `<div class="app-container"><div class="app-header"><h1 data-svelte-h="svelte-la326">🧠🧠 James 🧠🧠</h1> <p data-svelte-h="svelte-1esjus8">He will remember everything you tell him and answer your questions.
      (Please let me know if I have to discipline him. He&#39;s still learning, and
      any feedback is welcome!)</p></div> <div class="app-content"> <div class="action-selection"><input type="radio" value="Add Knowledge" id="add-knowledge"${""}> <label for="add-knowledge" data-svelte-h="svelte-112aynz">Add Knowledge</label> <input type="radio" value="Chat with your Brain" id="chat-with-brain"${""}> <label for="chat-with-brain" data-svelte-h="svelte-41acxd">Chat with your Brain</label> <input type="radio" value="Forget" id="forget"${""}> <label for="forget" data-svelte-h="svelte-1h6y6ie">Forget</label></div> ${`${`${``}`}`}</div> </div>`;
});
export {
  Page as default
};
