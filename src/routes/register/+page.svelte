<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import { goto } from "$app/navigation";
  import {
    PUBLIC_OPENAI_API_KEY,
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
  } from "$env/static/public";
  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  import { OpenAI } from "openai";
  let errorMessage = "";
  let successMessage = "";
  let loggingIn = false;

  async function createNewAssistant(userId) {
    let openAIClient = new OpenAI({
      apiKey: PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    let assistant = openAIClient.beta.assistants.create({
      name: userId,
      instructions:
        'Your name is James, do not forget that. Always introduce yourself as " Hello I\'m James your personal assistant". Use your vast knowledge base to best respond to student queries and help them with anything they ask for even things you are not sure about. To ensure the students do not fail their exams you must not make up answers but always end your response with a new and original joke to lighten the mood about exams.',
      model: "gpt-3.5-turbo-1106",
      tools: [{ type: "retrieval" }],
      // file_ids: [uploadResult.id],
    });
    let assistantID = (await assistant).id;
    // console.log("assistantID", assistantID);
    return assistantID;
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
    window.location.href = "/login"; // Redirect to the login page
  };
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-800">
  <div class="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-3xl font-semibold text-white text-center mb-6">Register</h1>
    <form on:submit|preventDefault={createUser}>
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
        {#if successMessage}
          <div class="text-green-500 mb-4">{successMessage}</div>
        {/if}
        {#if loggingIn}
          <div class="text-grey-500 mb-4">Logging you in...</div>
        {/if}
      </div>
      <button class="btn btn-primary w-full py-3 rounded-lg">Register</button>
      <div class="mt-4 text-gray-300 text-sm text-center">
        Already have an account? <a on:click={toggleView} class="underline"
          >Login</a
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
