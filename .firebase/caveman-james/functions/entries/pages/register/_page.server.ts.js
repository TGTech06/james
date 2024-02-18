import { AuthApiError } from "@supabase/supabase-js";
import { f as fail, r as redirect } from "../../../chunks/index.js";
const actions = {
  register: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const { data, error: err } = await locals.sb.auth.signUp({
      email: body.email,
      password: body.password
    });
    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: "Invalid email or password"
        });
      }
      return fail(500, {
        error: "Server error. Please try again later."
      });
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
