<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
  const supabaseClient = createClient(
    PUBLIC_SUPABASE_URL,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4"
  );

  let errorMessage = "";

  const loginUser = async (event: Event) => {
    event.preventDefault();

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorMessage = error.message;
    } else {
      errorMessage = ""; // Clear the error message if there was no error
      console.log(data?.session?.user);
      window.location.href = "/";
    }
  };

  const toggleView = () => {
    window.location.href = "/register"; // Redirect to the register page
  };
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-800">
  <div class="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-3xl font-semibold text-white text-center mb-6">Login</h1>
    <form on:submit|preventDefault={loginUser}>
      <div class="mb-4">
        <label for="email" class="block text-gray-300 text-sm font-bold"
          >Email</label
        >
        <input
          type="text"
          name="email"
          class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-300 text-sm font-bold"
          >Password</label
        >
        <input
          type="password"
          name="password"
          class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-700 text-white"
        />
      </div>
      <button class="btn btn-primary w-full py-3 rounded-lg">Login</button>
      <div class="mt-4 text-gray-300 text-sm text-center">
        Don't have an account? <a
          href="#"
          on:click={toggleView}
          class="underline">Register</a
        >
      </div>
    </form>
  </div>
</main>

<style>
  /* Custom styles for centering the form */
  main {
    display: flex;
    align-items: center;
  }
</style>
