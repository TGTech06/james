import { c as create_ssr_component, b as validate_store, d as subscribe, o as onDestroy, v as validate_component, f as each, e as escape, h as add_attribute } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index2.js";
import "langchain/chains";
import "langchain/memory";
import "langchain/llms/hf";
import "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/hf";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_KEY } from "../../../chunks/public.js";
import "langchain/vectorstores/memory";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
import { N as NavBar } from "../../../chunks/NavBar.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".grid.s-uhtJAkW7ZDek{display:grid;grid-template-columns:repeat(12, minmax(0, 1fr));grid-template-rows:auto;gap:1rem}.col-span-3.s-uhtJAkW7ZDek{grid-column:span 3}.col-span-6.s-uhtJAkW7ZDek{grid-column:span 6}.sidebar.s-uhtJAkW7ZDek{position:relative;z-index:1;display:none}.sidebar.open.s-uhtJAkW7ZDek{display:block}.toggle-btn.s-uhtJAkW7ZDek{position:fixed;bottom:10px;padding:10px;border-radius:50%;background-color:#333;color:#fff;font-size:18px;cursor:pointer;z-index:2;display:none}.toggle-btn.visible.s-uhtJAkW7ZDek{display:block}.toggle-chat-history-btn.s-uhtJAkW7ZDek{left:20px}.toggle-configuration-btn.s-uhtJAkW7ZDek{right:20px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userChats, $$unsubscribe_userChats;
  let $$unsubscribe_selectedChatMessages;
  createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  let temperature = 0.2;
  const userChats = writable([]);
  validate_store(userChats, "userChats");
  $$unsubscribe_userChats = subscribe(userChats, (value) => $userChats = value);
  const selectedChatMessages = writable([]);
  validate_store(selectedChatMessages, "selectedChatMessages");
  $$unsubscribe_selectedChatMessages = subscribe(selectedChatMessages, (value) => value);
  let isChatHistorySidebarOpen = false;
  let isConfigurationSidebarOpen = false;
  let isMobile = false;
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  function handleMobileViewChange(event) {
    isMobile = event.matches;
  }
  onDestroy(() => {
    mediaQuery.removeListener(handleMobileViewChange);
  });
  $$result.css.add(css);
  $$unsubscribe_userChats();
  $$unsubscribe_selectedChatMessages();
  return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> ${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col min-h-screen bg-gray-900 text-white p-4">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <div class="grid s-uhtJAkW7ZDek"> <div class="${[
        "col-span-3 bg-gray-800 rounded-lg p-4 sidebar s-uhtJAkW7ZDek",
        !isMobile && isChatHistorySidebarOpen ? "open" : ""
      ].join(" ").trim()}"><h2 class="text-2xl font-bold mb-4" data-svelte-h="svelte-141gz04">Chat History</h2>  <button class="btn btn-primary btn-sm mb-2"><i class="fas fa-plus"></i> New Chat</button> <div class="overflow-y-auto h-96">${each($userChats, (chat) => {
        return `<div class="flex items-center justify-between mb-2"><span>Chat ID: ${escape(chat.chat_id)}</span>  <button class="btn btn-error btn-sm"><i class="fas fa-trash-alt"></i></button> </div>`;
      })}</div></div>  <div class="col-span-6 s-uhtJAkW7ZDek"><div class="col-span-6 s-uhtJAkW7ZDek"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-fy4ok2">Chat Messages</h1> ${`<p class="text-gray-500" data-svelte-h="svelte-ulna32">Select a chat from the history to view messages.</p>`}</div>  <div class="col-span-9"><div class="form-control mb-4"><textarea id="question" class="textarea textarea-primary">${escape("")}</textarea></div>  <button class="btn btn-primary mb-4" ${"disabled"}>Ask the AI and Send Message</button></div></div>  <div class="${[
        "col-span-3 bg-gray-800 rounded-lg p-4 sidebar s-uhtJAkW7ZDek",
        !isMobile && isConfigurationSidebarOpen ? "open" : ""
      ].join(" ").trim()}"><h2 class="text-2xl font-bold mb-4" data-svelte-h="svelte-1ali85g">Configuration</h2> <p class="mb-4" data-svelte-h="svelte-73zky">Choose your model and temperature for asking questions.</p> <div class="form-control"><label for="model" data-svelte-h="svelte-6cjlpw">Model</label> <select id="model" class="input input-primary"><option value="tiiuae/falcon-7b-instruct" data-svelte-h="svelte-m8jcxa">tiiuae/falcon-7b-instruct</option><option value="meta-llama/Llama-2-70b-chat-hf" data-svelte-h="svelte-1hemkti">meta-llama/Llama-2-70b-chat-hf</option><option value="OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5" data-svelte-h="svelte-1epjw1g">OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5</option></select></div> <div class="form-control mt-4"><label for="temperature" data-svelte-h="svelte-11sobei">Temperature</label> <input type="range" id="temperature" min="0.1" max="1.0" step="0.2" class="input input-primary"${add_attribute("value", temperature, 0)}> <span class="text-sm ml-2">${escape(temperature)}</span></div></div></div>  <div class="${[
        "toggle-btn toggle-chat-history-btn s-uhtJAkW7ZDek",
        !isMobile || !isChatHistorySidebarOpen ? "visible" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-si78np">☰</div> <div class="${[
        "toggle-btn toggle-configuration-btn s-uhtJAkW7ZDek",
        !isMobile || !isConfigurationSidebarOpen ? "visible" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-18gmth0">☰</div></div>`;
    }
  })}`;
});
export {
  Page as default
};
