<script lang="ts">
  import type { LayoutData } from "./$types";
  import { onMount } from "svelte";
  import "../app.css";
  import { supabaseClient } from "$lib/supabase";
  import { invalidateAll } from "$app/navigation";
  export let data: LayoutData;

  onMount(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<slot />
