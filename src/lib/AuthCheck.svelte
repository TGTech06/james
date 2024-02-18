<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import type { Session } from "@supabase/supabase-js";
  import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
  import { onMount, setContext } from "svelte";

  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

  let isLoggedIn = true;

  const loadContent = async () => {
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.getSession();
    if (error) {
      console.log(error);
    } else if (session?.user) {
      // User is logged in
      isLoggedIn = true;
    } else {
      // User is not logged in
      isLoggedIn = false;
    }
  };
  onMount(() => {
    loadContent();
  });

  // Set the isLoggedIn store as a context variable to access it in child components
  setContext("isLoggedIn", isLoggedIn);
</script>

{#if isLoggedIn}
  <!-- Display the content if the user is logged in -->
  <div id="content">
    <slot />
  </div>
{:else}
  <!-- Show the error message if the user is not logged in -->
  <div id="error-message">
    <!-- Error message for when the user is not logged in -->
    <div class="auth-container">
      <p class="auth-message">You must be signed in to view this page.</p>
      <div class="auth-buttons">
        <a href="/login" class="auth-button auth-button-primary">Login</a>
        <a href="/register" class="auth-button auth-button-secondary"
          >Register</a
        >
      </div>
    </div>
  </div>
{/if}

<style>
  main {
    display: flex;
    align-items: center;
    min-height: 100vh; /* Set minimum height to fill the screen */
    background-color: bg-gray-900; /* Change the background color to your desired dark color */
  }
  /* Add your CSS styles here to match the redesign */
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 24px;
    font-weight: bold;
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .auth-message {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    color: white;
    text-align: center;
  }

  .auth-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .auth-button {
    padding: 12px 24px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }

  .auth-button-primary {
    background-color: #3b82f6;
  }

  .auth-button-secondary {
    background-color: #6b7280;
  }

  .auth-button-primary:hover,
  .auth-button-secondary:hover {
    filter: brightness(1.2);
  }
</style>
