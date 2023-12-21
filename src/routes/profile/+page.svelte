<script lang="ts">
  import { onMount } from "svelte";
  import { createClient } from "@supabase/supabase-js";
  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
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
  let vector;
  // Reactive statement to handle documents list
  let documents = [];
  let userID = "";
  let userIsPremium = false;
  let openAIClient;
  let assistantId;
  // Bind the functions to the corresponding elements in the forget.html file, if needed
  onMount(async () => {
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    let embeddings = new OpenAIEmbeddings({ openAIApiKey });
    openAIClient = new OpenAI({
      apiKey: PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    vector = new SupabaseVectorStore(
      embeddings,
      // new HuggingFaceInferenceEmbeddings({
      //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
      // }),
      {
        client: supabase,
        tableName: "documents",
      }
    );
    //userID = supabase.auth.getUser().id;
    await getUserID();
    await getUserData();
    await createUserDataIfNotExists(userID);
    assistantId = await getAssistantID(userID);
    console.log(assistantId);
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
        console.log("Assistant ID:", assistantId);
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

  export async function handleDeleteDocument(assistantId, fileId) {
    try {
      // Use the OpenAI API client to delete the assistant file
      // const deleteResponse = await openAIClient.beta.assistants.files.delete(
      //   assistantId,
      //   fileId
      // );

      const deletedFromAssistants =
        await openAIClient.beta.assistants.files.del(assistantId, fileId);
      const deletedFile = await openAIClient.files.del(fileId);
      console.log(deletedFile);

      if (
        deletedFile.deleted === true &&
        deletedFromAssistants.deleted === true
      ) {
        console.log(`Successfully deleted file with ID ${fileId}`);
        documents = await getDocuments(openAIClient, assistantId);
        // Add any additional UI logic or state updates as needed
      } else {
        console.error(`Error deleting file with ID ${fileId}`);
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
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
        'Your name is James, do not forget that. Always introduce yourself as " Hello I\'m James your personal assistant". Use your vast knowledge base to best respond to student queries and help them with anything they ask for even things you are not sure about. To ensure the students do not fail their exams you must not make up answers but always end your response with a new and original joke to lighten the mood about exams.',
      model: "gpt-3.5-turbo-1106",
      tools: [{ type: "retrieval" }],
      // file_ids: [uploadResult.id],
    });
    let assistantID = (await assistant).id;
    console.log(assistantID);
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

    if (bytesNumber === 0) return "0 Byte";

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
        // console.error("Error fetching user data:", error);
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
      console.log("checking user");
      // Check if user data already exists
      const { data, error } = await supabase
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!data && userID != null && userID != "") {
        console.log("creating user");
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

        // if (insertError) {
        //   console.error("Error creating user data:", insertError);
        // }
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

        <!-- <button
          class="btn btn-primary btn-md flex items-center"
          on:click={() => createNewAssistant()}
        >
          <i class="fas fa-sign-out-alt" />
        </button> -->
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
                on:click={() => handleDeleteDocument(assistantId, document.id)}
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

<!-- Your forget page content -->
<!-- ... -->

<!-- Add navigation buttons to move between pages -->
<!-- ... -->

<style>
  .btn-md {
    padding: 12px 24px; /* Adjust the padding to make the button larger */
    font-size: 16px; /* Adjust the font size to make the icon larger */
  }
  nav {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  nav a {
    padding: 8px 12px;
  }

  nav a:hover {
    color: #d1d5db; /* A slightly muted color on hover */
  }
</style>
