import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL } from "../../../chunks/public.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.s-BUJUVtHZo5xi{display:flex;align-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createClient(PUBLIC_SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4");
  $$result.css.add(css);
  return `<main class="min-h-screen flex items-center justify-center bg-gray-800 s-BUJUVtHZo5xi"><div class="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"><h1 class="text-3xl font-semibold text-white text-center mb-6" data-svelte-h="svelte-1dh7cyo">Login</h1> <form><div class="mb-4"><label for="email" class="block text-gray-300 text-sm font-bold" data-svelte-h="svelte-njy74e">Email</label> <input type="text" name="email" class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"></div> <div class="mb-4"><label for="password" class="block text-gray-300 text-sm font-bold" data-svelte-h="svelte-fxoko8">Password</label> <input type="password" name="password" class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"></div> <button class="btn btn-primary w-full py-3 rounded-lg" data-svelte-h="svelte-1tr4r7k">Login</button> <div class="mt-4 text-gray-300 text-sm text-center">Don&#39;t have an account? <a href="#" class="underline" data-svelte-h="svelte-laq8g0">Register</a></div></form></div> </main>`;
});
export {
  Page as default
};
