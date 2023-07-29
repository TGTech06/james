import { c as create_ssr_component, v as validate_component, f as each, e as escape } from "../../../chunks/ssr.js";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/hf";
import "langchain/embeddings/openai";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
import { N as NavBar } from "../../../chunks/NavBar.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".btn-md.s-zqG5o-EiPySZ{padding:12px 24px;font-size:16px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let documents = [];
  $$result.css.add(css);
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4"><div class="flex flex-col items-center">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <div class="p-8"><div class="flex items-center justify-between"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-8zxus5">Your James</h1> <button class="btn btn-secondary btn-md flex items-center s-zqG5o-EiPySZ"><i class="fas fa-sign-out-alt"></i></button></div> <div class="space-y-4">${each(documents, (document) => {
        return `<div class="bg-gray-800 p-4 rounded-lg flex items-center justify-between"><div><p class="text-lg"><strong>${escape(document.name)}</strong> (${escape(document.size)} bytes)
                </p></div> <button class="btn btn-error"><i class="fas fa-trash white-icon"></i></button> </div>`;
      })}</div></div></div></div>`;
    }
  })}    `;
});
export {
  Page as default
};
