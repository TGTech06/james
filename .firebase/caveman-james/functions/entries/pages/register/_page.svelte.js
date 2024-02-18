import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_KEY } from "../../../chunks/public.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.s-3VVNyCg7ZOTK{display:flex;align-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  $$result.css.add(css);
  return `<main class="min-h-screen flex items-center justify-center bg-gray-800 s-3VVNyCg7ZOTK"><div class="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"><h1 class="text-3xl font-semibold text-white text-center mb-6" data-svelte-h="svelte-ygwsag">Register</h1> <form><div class="mb-4"><label for="email" class="block text-gray-300 text-sm font-bold" data-svelte-h="svelte-njy74e">Email</label> <input type="text" name="email" class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"></div> <div class="mb-4"><label for="password" class="block text-gray-300 text-sm font-bold" data-svelte-h="svelte-fxoko8">Password</label> <input type="password" name="password" class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"></div> <button class="btn btn-primary w-full py-3 rounded-lg" data-svelte-h="svelte-egqvry">Register</button> <div class="mt-4 text-gray-300 text-sm text-center">Already have an account? <a href="#" class="underline" data-svelte-h="svelte-1wxmq1k">Login</a></div></form></div> </main>`;
});
export {
  Page as default
};
