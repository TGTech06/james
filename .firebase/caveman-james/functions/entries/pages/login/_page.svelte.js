import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL } from "../../../chunks/public.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createClient(PUBLIC_SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4");
  return `<main><h1 data-svelte-h="svelte-1wsy7a9">Login</h1> <form class="auth-form"><label for="" data-svelte-h="svelte-1livd56">Email</label> <input type="text" name="email"> <label for="" data-svelte-h="svelte-znmm6n">Password</label> <input type="password" name="password"> <button class="btn btn-primary" data-svelte-h="svelte-yuaqlh">Login</button></form></main>`;
});
export {
  Page as default
};
