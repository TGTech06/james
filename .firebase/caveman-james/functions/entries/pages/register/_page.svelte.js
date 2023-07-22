import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_KEY } from "../../../chunks/public.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  return `<main><h1 data-svelte-h="svelte-issj3d">Register</h1> <form class="auth-form"><label for="" data-svelte-h="svelte-1livd56">Email</label> <input type="text" name="email"> <label for="" data-svelte-h="svelte-znmm6n">Password</label> <input type="password" name="password"> <button class="btn btn-primary" data-svelte-h="svelte-1o26k7f">Register</button></form></main>`;
});
export {
  Page as default
};
