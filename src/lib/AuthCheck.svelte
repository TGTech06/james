<script lang="ts">
  //   import { user } from "$lib/firebase";
  import { createClient } from "@supabase/supabase-js";
  import type { Session } from "@supabase/supabase-js";
  import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

  // const {
  //   data: { session },
  // } = await supabaseClient.auth.getSession()

  const getSessionData = async () => {
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.getSession();

    if (error) {
      console.log(error);
      return null;
    }

    return session;
  };
</script>

{#await getSessionData()}
  <p>Loading...</p>
{:then session}
  {#if session?.user}
    <slot />
  {:else}
    <p class="text-center text-danger">
      You must be signed in to view this page
    </p>
    <div class="auth-buttons">
      <a href="/login" class="btn btn-primary">Login</a>
      <a href="/register" class="btn btn-secondary">Register</a>
    </div>
  {/if}
{:catch error}
  <p class="text-center text-danger">Error: {error.message}</p>
{/await}
