<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import { goto } from "$app/navigation";
  import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

  let errorMessage = "";

  async function createUserDataIfNotExists(userId) {
    try {
      // Check if user data already exists
      const { data, error } = await supabaseClient
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!data) {
        // User data doesn't exist; create a new row
        const { data: insertedData, error: insertError } = await supabaseClient
          .from("user_data")
          .upsert([
            {
              user_id: userId,
              total_data_size: 0,
              is_premium: false,
            },
          ]);

        // if (insertError) {
        //   console.error("Error creating user data:", insertError);
        // }
      }
    } catch (e) {
      console.error("Error occurred while creating user data:", e);
    }
  }

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
      await createUserDataIfNotExists(data.user.id);
      window.location.href = "/";
      setTimeout(() => goto("/"), 0);
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
        Don't have an account? <a on:click={toggleView} class="underline"
          >Register</a
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
