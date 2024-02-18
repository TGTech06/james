import { c as create_ssr_component, a as setContext } from "./ssr.js";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_KEY } from "./public.js";
import "./NavBar.js";
const css = {
  code: ".auth-container.s-NSJxguceXFrJ{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh}.auth-message.s-NSJxguceXFrJ{font-size:24px;font-weight:bold;margin-bottom:16px;color:white;text-align:center}.auth-buttons.s-NSJxguceXFrJ{display:flex;justify-content:center;gap:16px}.auth-button.s-NSJxguceXFrJ{padding:12px 24px;font-size:18px;font-weight:bold;border-radius:8px;text-decoration:none;color:#fff;cursor:pointer}.auth-button-primary.s-NSJxguceXFrJ{background-color:#3b82f6}.auth-button-secondary.s-NSJxguceXFrJ{background-color:#6b7280}.auth-button-primary.s-NSJxguceXFrJ:hover,.auth-button-secondary.s-NSJxguceXFrJ:hover{filter:brightness(1.2)}",
  map: null
};
const AuthCheck = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  let isLoggedIn = true;
  setContext("isLoggedIn", isLoggedIn);
  $$result.css.add(css);
  return `${` <div id="content">${slots.default ? slots.default({}) : ``}</div>`}`;
});
export {
  AuthCheck as A
};
