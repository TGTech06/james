<script lang="ts">
  import { goto } from "$app/navigation";
  import { supabaseClient } from "$lib/supabase.js";
  let errorMessage = "";
  let loggingIn = false;

  async function createNewAssistant(userID) {
    const formData = new FormData();
    formData.append("userID", userID);
    const response = await fetch("/api/general/createAssistant", {
      method: "POST",
      body: formData,
    });
    const assistantID = await response.text();
    if (response.status === 200) {
      return assistantID;
    } else {
      return null;
    }
  }
  async function createUserDataIfNotExists(userId) {
    try {
      // Check if user data already exists
      const { data, error } = await supabaseClient
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!data && userId != null && userId != "") {
        let assistantID = await createNewAssistant(userId);
        if (assistantID === null) {
          console.error("Error creating assistant");
          return "Error creating assistant";
        }
        // User data doesn't exist; create a new row
        const { data: insertedData, error: insertError } = await supabaseClient
          .from("user_data")
          .upsert([
            {
              user_id: userId,
              total_data_size: 0,
              is_premium: false,
              stripe_customer_id: userId,
              assistant_id: assistantID,
            },
          ]);

        // if (insertError) {
        //   console.error("Error creating user data:", insertError);
        // }
      } else {
        console.log("User data already exists");
      }
      return "success";
    } catch (e) {
      console.error("Error occurred while creating user data:", e);
      return e.message;
    }
  }

  const loginUser = async (event: Event) => {
    errorMessage = "";
    loggingIn = true;
    try {
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
        let outcome = await createUserDataIfNotExists(data.user.id);
        if (outcome === "success") {
          errorMessage = "";
        } else {
          errorMessage = outcome;
        }
        window.location.href = "/";
        setTimeout(() => goto("/"), 0);
      }
    } catch (e) {
      console.error(e);
      errorMessage = e.message;
    }
    loggingIn = false;
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
      <div class="text-center">
        {#if errorMessage}
          <div class="text-red-500 mb-4">{errorMessage}</div>
        {/if}
        {#if loggingIn}
          <div class="text-grey-500 mb-4">Logging you in...</div>
        {/if}
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
