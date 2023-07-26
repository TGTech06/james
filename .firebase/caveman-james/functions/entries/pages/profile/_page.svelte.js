import { c as create_ssr_component, v as validate_component, f as each, e as escape } from "../../../chunks/ssr.js";
import "langchain/vectorstores/supabase";
import "langchain/embeddings/hf";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".btn-md.s-zqG5o-EiPySZ.s-zqG5o-EiPySZ{padding:12px 24px;font-size:16px}nav.s-zqG5o-EiPySZ.s-zqG5o-EiPySZ{box-shadow:0 2px 4px rgba(0, 0, 0, 0.2)}nav.s-zqG5o-EiPySZ a.s-zqG5o-EiPySZ{padding:8px 12px}nav.s-zqG5o-EiPySZ a.s-zqG5o-EiPySZ:hover{color:#d1d5db}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let documents = [];
  $$result.css.add(css);
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4"><div class="flex flex-col items-center"><nav class="w-full bg-gray-900 rounded-lg mb-6 shadow-md s-zqG5o-EiPySZ"><div class="navbar p-4 bg-gray-900 text-white rounded-t-lg rounded-b-lg border border-white"><div class="flex items-center justify-center flex-1"><a href="/" class="text-3xl font-bold hover:text-blue-400 cursor-pointer s-zqG5o-EiPySZ" data-svelte-h="svelte-1da30rr">James 🧠🧠</a></div> <div class="flex items-center justify-center flex-1 space-x-4"><a href="/upload" class="text-lg text-white hover:text-blue-400 s-zqG5o-EiPySZ" data-svelte-h="svelte-8kva0r">Upload Data</a> <a href="/ask" class="text-lg text-white hover:text-blue-400 s-zqG5o-EiPySZ" data-svelte-h="svelte-1i5p5cg">Chat with James</a> <a href="/profile" class="text-lg text-white hover:text-blue-400 s-zqG5o-EiPySZ" data-svelte-h="svelte-3pkr3">Profile</a> </div></div></nav> <div class="p-8"><div class="flex items-center justify-between"><h1 class="text-4xl font-bold mb-8" data-svelte-h="svelte-8zxus5">Your James</h1> <button class="btn btn-secondary btn-md flex items-center s-zqG5o-EiPySZ"><i class="fas fa-sign-out-alt"></i></button></div> <div class="space-y-4">${each(documents, (document) => {
        return `<div class="bg-gray-800 p-4 rounded-lg flex items-center justify-between"><div><p class="text-lg"><strong>${escape(document.name)}</strong> (${escape(document.size)} bytes)
                </p></div> <button class="btn btn-error"><i class="fas fa-trash white-icon"></i></button> </div>`;
      })}</div></div></div></div>`;
    }
  })}    `;
});
export {
  Page as default
};
