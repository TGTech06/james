import { s as supabaseClient } from "../../chunks/supabase.js";
const load = async () => {
  console.log("Ran layout load");
  return {
    session: await supabaseClient.auth.getSession()
  };
};
export {
  load
};
