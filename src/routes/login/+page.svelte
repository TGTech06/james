<script lang="ts">
  import { goto } from "$app/navigation";
  import { supabaseClient } from "$lib/supabase.js";

  let errorMessage = "";
  let successMessage = "";
  let loggingIn = false;

  const handleForgotPassword = async () => {
    event.preventDefault();
    const email = prompt("Please enter your email:");
    if (email) {
      sendPasswordResetRequest(email);
    }
  };
  const sendPasswordResetRequest = async (email: string) => {
    successMessage = "";
    errorMessage = "";
    try {
      const { data, error } =
        await supabaseClient.auth.resetPasswordForEmail(email);

      if (error) {
        errorMessage = error.message;
        console.error("Error sending password reset request:", error.message);
        // Handle the error, show a message to the user, etc.
      } else {
        successMessage = "Password reset email sent successfully";
        console.log("Password reset email sent successfully");
        // Optionally, show a success message to the user
      }
    } catch (e) {
      errorMessage = e.message;
      console.error("Error sending password reset request:", e.message);
      // Handle the error, show a message to the user, etc.
    }
  };
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

  const loginUser = async (event: Event) => {
    errorMessage = "";
    successMessage = "";
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
    event.preventDefault();
    window.location.href = "/register"; // Redirect to the register page
  };
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-3xl font-semibold text-gray-800 text-center mb-6">Login</h1>
    <form on:submit|preventDefault={loginUser}>
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
          <div class="text-green-700 mb-4">{successMessage}</div>
        {/if}
        {#if loggingIn}
          <div class="text-gray-800 mb-4">Logging you in...</div>
        {/if}
      </div>
      <button
        class="btn w-full py-3 rounded-lg hover:bg-black bg-black text-white"
        >Login</button
      >
      <div class="mt-4 text-gray-600 text-sm text-center">
        Don't have an account? <button
          on:click={toggleView}
          class="hover:underline">Register</button
        >
      </div>
      <div class="mt-2 text-center">
        <button
          class="text-sm text-gray-600 hover:underline"
          on:click={handleForgotPassword}>Forgot password?</button
        >
      </div>
    </form>
  </div>
</main>
