import { c as create_ssr_component, i as is_promise, n as noop, e as escape, f as add_attribute, h as each, v as validate_store, a as subscribe, d as validate_component } from "../../chunks/ssr.js";
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
  return `<div class="p-8 flex flex-col items-center h-screen"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-1jf55pk">Insert Data Page</h1>  ${``}  <div class="w-full mb-8"><label class="label mb-2 text-lg font-bold" data-svelte-h="svelte-qb0qet">Upload Files</label> <div class="flex items-center"><input type="file" multiple class="input input-accent mr-4"> <button class="btn btn-primary text-lg font-bold" data-svelte-h="svelte-tt1zro">Upload Files</button></div></div>  <div class="w-full"><label class="label mb-2 text-lg font-bold" data-svelte-h="svelte-123a26r">Add the URL to the database</label> <div class="flex items-center"><textarea class="textarea textarea-accent resize-none flex-grow text-lg font-bold" rows="1">${escape("")}</textarea> <button class="btn btn-primary text-lg font-bold ml-4" data-svelte-h="svelte-1y9apbx">Add URL</button></div></div></div>  `;
});
const ask_svelte_svelte_type_style_lang = "";
const css = {
  code: ".form-control.s-NxPPOnB08NvG label.s-NxPPOnB08NvG{font-size:1rem}.form-control.s-NxPPOnB08NvG span.s-NxPPOnB08NvG{font-size:0.75rem}#displayTextContainer.s-NxPPOnB08NvG.s-NxPPOnB08NvG{white-space:pre-wrap}",
  map: null
};
const Ask = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let temperature = 0.2;
  let responseText = "";
  $$result.css.add(css);
  return `<div class="grid grid-cols-12 min-h-screen gap-4 bg-gray-900 text-white p-8"> <div class="col-span-3 bg-gray-800 rounded-lg p-4"><h2 class="text-2xl font-bold mb-4" data-svelte-h="svelte-1ali85g">Configuration</h2> <p class="mb-4" data-svelte-h="svelte-1xczfp8">Choose your model and temperature for asking questions.</p> <div class="form-control s-NxPPOnB08NvG"><label for="model" class="s-NxPPOnB08NvG" data-svelte-h="svelte-6cjlpw">Model</label> <select id="model" class="input input-primary"><option value="tiiuae/falcon-7b-instruct" data-svelte-h="svelte-2e4awe">tiiuae/falcon-7b-instruct</option><option value="meta-llama/Llama-2-70b-chat-hf" data-svelte-h="svelte-ejnk6e">meta-llama/Llama-2-70b-chat-hf</option><option value="OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5" data-svelte-h="svelte-1jx7lkk">OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5</option></select></div> <div class="form-control mt-4 s-NxPPOnB08NvG"><label for="temperature" class="s-NxPPOnB08NvG" data-svelte-h="svelte-11sobei">Temperature</label> <input type="range" id="temperature" min="0.1" max="1.0" step="0.2" class="input input-primary"${add_attribute("value", temperature, 0)}> <span class="text-sm ml-2 s-NxPPOnB08NvG">${escape(temperature)}</span></div></div>  <div class="col-span-9"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-1m9568">Ask AI Page</h1> <div class="form-control mb-4 s-NxPPOnB08NvG"><label for="question" class="label s-NxPPOnB08NvG" data-svelte-h="svelte-20y8o">Your Question</label> <textarea id="question" class="textarea textarea-primary">${escape("")}</textarea></div> <button class="btn btn-primary mb-4" data-svelte-h="svelte-hvko4i">Ask the AI</button>  <div class="bg-gray-800 p-4 rounded-lg"><p class="text-xl mb-2" data-svelte-h="svelte-1th80ox">Generated Text:</p> <div id="displayTextContainer" class="text-gray-200 s-NxPPOnB08NvG">${escape(responseText)}</div></div></div> </div>`;
});
const Forget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let documents = [];
  return `<div class="p-8"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-ew6ckg">Forget Data Page</h1> <div class="space-y-4">${each(documents, (document) => {
    return `<div class="bg-gray-800 p-4 rounded-lg flex items-center justify-between"><div><p class="text-lg"><strong>${escape(document.name)}</strong> (${escape(document.size)} bytes)
          </p></div> <button class="btn btn-error"><i class="fas fa-trash"></i></button> </div>`;
  })}</div></div>    `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mode, $$unsubscribe_mode;
  let mode = writable("Add Knowledge");
  validate_store(mode, "mode");
  $$unsubscribe_mode = subscribe(mode, (value) => $mode = value);
  $$unsubscribe_mode();
  return `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> ${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col min-h-screen bg-gray-800 text-white"><div class="flex items-center justify-between p-4"> <button class="btn btn-secondary btn-sm"><i class="fas fa-sign-out-alt"></i></button></div> <div class="app-header p-4"><h1 class="text-4xl font-bold text-center mb-4" data-svelte-h="svelte-ngxor5">🧠🧠 James 🧠🧠</h1> <p class="text-lg text-center" data-svelte-h="svelte-1apk2rh">He will remember everything you tell him and answer your questions.
        (Please let me know if I have to discipline him. He&#39;s still learning,
        and any feedback is welcome!)</p></div> <div class="flex-grow p-8"> ${$mode === "Add Knowledge" ? `${validate_component(Insert, "Insert").$$render($$result, {}, {}, {})}` : `${$mode === "Chat with your Brain" ? `${validate_component(Ask, "Ask").$$render($$result, {}, {}, {})}` : `${$mode === "Forget" ? `${validate_component(Forget, "Forget").$$render($$result, {}, {}, {})}` : ``}`}`}</div>  <div class="flex justify-center space-x-8 mt-8 p-4"><a class="text-lg text-blue-500 hover:underline cursor-pointer" data-svelte-h="svelte-1csc6x5">Add Knowledge</a> <a class="text-lg text-blue-500 hover:underline cursor-pointer" data-svelte-h="svelte-1mhqcqx">Chat with your Brain</a> <a class="text-lg text-blue-500 hover:underline cursor-pointer" data-svelte-h="svelte-12w6ws7">Forget</a></div></div> <style data-svelte-h="svelte-f0208p">/* Add your CSS styles here to match the Streamlit app's appearance */
    /* Example: .app-title { font-size: 24px; } */

    /* Custom styles for the app container and header */
    .app-container {
      padding: 24px;
      border-radius: 8px;
    }

    .app-header {
      text-align: center;
      margin-bottom: 24px;
    }

    /* Custom styles for navigation links */
    .text-blue-500 {
      color: #3b82f6;
    }

    .text-blue-500:hover {
      color: #2563eb;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: #fff;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .btn-secondary:hover {
      background-color: #525b62;
    }</style>`;
    }
  })}`;
});
export {
  Page as default
};
