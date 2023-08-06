import { c as create_ssr_component, b as validate_store, d as subscribe, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index2.js";
import "langchain/chains";
import "langchain/memory";
import "langchain/llms/hf";
import "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import "langchain/vectorstores/supabase";
import "langchain/llms/openai";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_KEY } from "../../../chunks/public.js";
import "langchain/vectorstores/memory";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
import { N as NavBar } from "../../../chunks/NavBar.js";
import "langchain/embeddings/hf";
const ChatInput_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".sidebar-toggle-btn.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{position:absolute;top:1rem;width:2.5rem;height:2.5rem;display:flex;justify-content:center;align-items:center;border-radius:50%;background-color:#fff;box-shadow:0 2px 4px rgba(0, 0, 0, 0.2);cursor:pointer;z-index:2}.sidebar-toggle-btn.s-uhtJAkW7ZDek .chevron.s-uhtJAkW7ZDek{color:#1f2937}.flex.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{display:flex}.chat-container.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{height:300px;overflow-y:auto}.chat-message.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{margin-bottom:8px}.chat-message.is-user-message.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{color:#ffcc00}@media(max-width: 50px){.md\\:flex-row.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{flex-direction:row}.sidebar.s-uhtJAkW7ZDek.s-uhtJAkW7ZDek{position:absolute;top:0;left:0;transform:translateX(-100%);transition:transform 0.3s ease-in-out;z-index:1;width:80%}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_selectedChatMessages;
  let $$unsubscribe_userChats;
  createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  const userChats = writable([]);
  validate_store(userChats, "userChats");
  $$unsubscribe_userChats = subscribe(userChats, (value) => value);
  const selectedChatMessages = writable([]);
  validate_store(selectedChatMessages, "selectedChatMessages");
  $$unsubscribe_selectedChatMessages = subscribe(selectedChatMessages, (value) => value);
  $$result.css.add(css);
  $$unsubscribe_selectedChatMessages();
  $$unsubscribe_userChats();
  return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> ${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col bg-gray-900 text-white p-4 s-uhtJAkW7ZDek">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <div class="relative flex flex-col md:flex-row min-h-screen s-uhtJAkW7ZDek"> ${``} <div class="sidebar-toggle-btn s-uhtJAkW7ZDek" style="left: 1rem">${`<i class="chevron fas fa-chevron-right text-2xl s-uhtJAkW7ZDek"></i>`}</div>  <div class="flex flex-col items-center justify-center w-full md:w-3/4 mx-auto s-uhtJAkW7ZDek"><div class="w-full md:w-3/4"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-fy4ok2">Chat Messages</h1> ${`<p class="text-gray-500" data-svelte-h="svelte-ulna32">Select a chat from the history to view messages.</p>`}</div>  <div class="w-full md:w-3/4 mt-4"><div class="form-control mb-4"><textarea id="question" class="textarea textarea-primary" ${"disabled"}>${escape("")}</textarea></div>  <button class="btn btn-primary mb-4" ${"disabled"}>Ask the AI and Send Message</button></div></div></div> ${``} </div>`;
    }
  })}`;
});
export {
  Page as default
};
