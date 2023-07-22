<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

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
