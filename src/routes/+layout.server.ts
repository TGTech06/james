//import { serverSession } from "@supabase/auth-helpers-sveltekit"
import type { LayoutServerLoad } from "./$types"
import { supabaseClient } from "$lib/supabase";

export const load: LayoutServerLoad = async () => {
	return {
		session: await supabaseClient.auth.getSession(),
	}
}