<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
  const supabaseClient = createClient(
    PUBLIC_SUPABASE_URL,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4"
  );

  const createUser = async (event: Event) => {
    event.preventDefault();

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }

    console.log(data.user.id);
    window.location.href = "/";
  };
</script>

<main>
  <h1>Register</h1>
  <form on:submit|preventDefault={createUser} class="auth-form">
    <label for="">Email</label>
    <input type="text" name="email" />
    <label for="">Password</label>
    <input type="password" name="password" />
    <button class="btn btn-primary">Register</button>
  </form>
</main>
