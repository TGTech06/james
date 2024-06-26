<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import { goto } from "$app/navigation";
  import { supabaseClient } from "$lib/supabase.js";

  let errorMessage = "";
  let successMessage = "";
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
      } else {
        console.log("User data already exists");
      }
      return "success";
    } catch (e) {
      console.error("Error occurred while creating user data:", e);
      return e.message;
    }
  }

  const createUser = async (event: Event) => {
    errorMessage = "";
    loggingIn = true;
    try {
      event.preventDefault();

      const email = (event.target as HTMLFormElement).email.value;
      const password = (event.target as HTMLFormElement).password.value;

      const { data, error } = await supabaseClient.auth.signUp({
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
    event.preventDefault();
    window.location.href = "/login"; // Redirect to the login page
  };
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-3xl font-semibold text-gray-800 text-center mb-6">
      Register
    </h1>
    <form on:submit|preventDefault={createUser}>
      <div class="mb-4">
        <label for="email" class="block text-gray-600 text-sm font-bold"
          >Email</label
        >
        <input
          type="text"
          name="email"
          class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-200 text-gray-800"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-600 text-sm font-bold"
          >Password</label
        >
        <input
          type="password"
          name="password"
          class="form-input mt-1 block w-full py-2 px-4 rounded-md bg-gray-200 text-gray-800"
        />
      </div>
      <div class="text-center">
        {#if errorMessage}
          <div class="text-red-500 mb-4">{errorMessage}</div>
        {/if}
        {#if successMessage}
          <div class="text-green-500 mb-4">{successMessage}</div>
        {/if}
        {#if loggingIn}
          <div class="text-gray-600 mb-4">Creating your account...</div>
        {/if}
      </div>
      <button
        class="btn w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800"
        >Register</button
      >
      <div class="mt-4 text-gray-600 text-sm text-center">
        Already have an account? <button
          on:click={toggleView}
          class="hover:underline">Login</button
        >
      </div>
    </form>
  </div>
</main>
