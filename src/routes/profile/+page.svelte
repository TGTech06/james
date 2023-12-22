<script lang="ts">
  import { onMount } from "svelte";
  import { createClient } from "@supabase/supabase-js";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_OPENAI_API_KEY,
  } from "$env/static/public";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";
  import { getDocuments, deleteDocument } from "$lib/brain.js";
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import { OpenAI } from "openai";
  // Initialize the Supabase client and other variables
  let supabase;
  let documents = [];
  let userID = "";
  let userIsPremium = false;
  let openAIClient;
  let assistantId;
  let successMessage = "";
  let deleting = false;
  let errorMessage = "";
  onMount(async () => {
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    let embeddings = new OpenAIEmbeddings({ openAIApiKey });
    openAIClient = new OpenAI({
      apiKey: PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    await getUserID();
    await getUserData();
    await createUserDataIfNotExists(userID);
    assistantId = await getAssistantID(userID);
    documents = await getDocuments(openAIClient, assistantId);
  });

  async function getAssistantID(userID) {
    const { data: userData, error: userError } = await supabase
      .from("user_data")
      .select("assistant_id")
      .eq("user_id", userID)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
    } else {
      if (userData) {
        const assistantId = userData.assistant_id;
        return assistantId;
      } else {
        console.log("User not found");
      }
    }
  }

  // Function to format timestamp to date
  function formatDate(timestamp) {
    const createdDate = new Date(timestamp * 1000);
    return `${createdDate.getDate()}/${
      createdDate.getMonth() + 1
    }/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`;
  }

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.reload();
    }
  }

  async function createNewAssistant() {
    let assistant = openAIClient.beta.assistants.create({
      name: "James",
      instructions:
        'Your name is James, do not forget that. Always introduce yourself as " Hello I\'m James your personal assistant". Use your vast knowledge base to best respond to student queries and help them with anything they ask for even things you are not sure about. Always cite your sources.',
      model: "gpt-3.5-turbo-1106",
      tools: [{ type: "retrieval" }],
    });
    let assistantID = (await assistant).id;
    return assistantID;
  }

  async function getUserID() {
    try {
      let user = await supabase.auth.getUser();
      userID = user.data.user.id;
    } catch (e) {
      userID = "";
      console.log(e);
    }
  }

  function formatBytes(bytes: string | number) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const bytesNumber = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;

    if (isNaN(bytesNumber)) return "Invalid Size";

    if (bytesNumber === 0) return "0 Bytes";

    const i = Math.floor(Math.log(bytesNumber) / Math.log(1024));

    return Math.round(bytesNumber / Math.pow(1024, i)) + " " + sizes[i];
  }

  async function getUserData() {
    try {
      // Fetch user data from Supabase
      const { data, error } = await supabase
        .from("user_data")
        .select("is_premium")
        .eq("user_id", userID)
        .single();
      if (error) {
        return;
      }
      if (data) {
        // Check if the user is premium based on the retrieved data
        userIsPremium = data.is_premium === true;
      }
    } catch (e) {
      console.error("Error occurred while fetching user data:", e);
    }
  }

  async function createUserDataIfNotExists(userId) {
    try {
      // Check if user data already exists
      const { data, error } = await supabase
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!data && userID != null && userID != "") {
        let assistantID = await createNewAssistant();
        // User data doesn't exist; create a new row
        const { data: insertedData, error: insertError } = await supabase
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
      }
    } catch (e) {
      console.error("Error occurred while creating user data:", e);
    }
  }
</script>

<AuthCheck>
  <div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4">
    <div class="flex flex-col items-center">
      <NavBar />
      {#if userIsPremium}
        <h1 class="text-2xl md:text-4xl font-bold mb-4 md:mb-8">
          I'm proud of you, you made the right choice!
        </h1>
        <button
          class="btn btn-primary w-full py-3 rounded-lg"
          on:click={() =>
            goto("https://billing.stripe.com/p/login/test_00gcNe78dfAkfh6288")}
          >Manage Subscription</button
        >
        <href>
          https://billing.stripe.com/p/login/test_00gcNe78dfAkfh6288
        </href>
      {/if}
      {#if !userIsPremium}
        <script async src="https://js.stripe.com/v3/buy-button.js">
        </script>
        <stripe-buy-button
          buy-button-id="buy_btn_1O1RagKva3oXMh3VCbLlg4oU"
          client-reference-id={userID}
          publishable-key="pk_test_51NZ025Kva3oXMh3Vgrnd7JRPcg1oaHj1A6jJUI5mLFw0sHVGdjxXmpKnR2S2KBbuBSsyBETbh3a0wJJoh2uCU3RK00QGpC68Ga"
        />
      {/if}
      <div class="mt-6">
        {#if errorMessage}
          <div class="text-red-500 mb-4">{errorMessage}</div>
        {/if}
        {#if successMessage}
          <div class="text-green-500 mb-4">{successMessage}</div>
        {/if}
        {#if deleting}
          <div class="text-grey-500 mb-4">Deleting...</div>
        {/if}
      </div>
      <div class="p-8">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl font-bold mb-8">Your James</h1>
          <button
            class="btn btn-secondary btn-md flex items-center"
            on:click={() => signOutUser()}
          >
            <i class="fas fa-sign-out-alt" />
          </button>
        </div>

        <div class="space-y-4">
          {#each documents as document}
            <div
              class="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p class="text-lg">
                  <strong class="text-l">{document.filename}</strong>
                  <br />
                  <span class="text-sm">{formatBytes(document.bytes)}</span>
                  <span class="text-sm"
                    >Created: {formatDate(document.created_at)}</span
                  >
                </p>
              </div>
              <button
                class="btn btn-error"
                on:click={async () => {
                  if (deleting) return;
                  deleting = true;
                  successMessage = "";
                  errorMessage = "";
                  let filename = document.filename;
                  let outcome = await deleteDocument(
                    openAIClient,
                    assistantId,
                    document.id
                  );
                  if (outcome === "success") {
                    documents = await getDocuments(openAIClient, assistantId);
                    successMessage =
                      "Successfully deleted " + filename + " from your James";
                  } else {
                    errorMessage = outcome;
                  }
                  deleting = false;
                }}
              >
                <i class="fas fa-trash white-icon" />
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</AuthCheck>

<style>
  .btn-md {
    padding: 12px 24px; /* Adjust the padding to make the button larger */
    font-size: 16px; /* Adjust the font size to make the icon larger */
  }
</style>
