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
  import {
    getDocuments,
    deleteDocument,
  } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/brain.js";
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";

  // Initialize the Supabase client and other variables
  let supabase;
  let vector;
  // Reactive statement to handle documents list
  let documents = [];

  // Bind the functions to the corresponding elements in the forget.html file, if needed
  onMount(async () => {
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    let embeddings = new OpenAIEmbeddings({ openAIApiKey });
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

    documents = await getDocuments(supabase);
  });

  async function handleDeleteDocument(documentName) {
    // Extract the filename from the full URL
    const urlParts = documentName.split("/");
    const filename = urlParts[urlParts.length - 1];

    const isDeleted = await deleteDocument(supabase, filename);
    if (isDeleted) {
      // Document deleted successfully
      documents = documents.filter((doc) => doc.name !== filename);
    } else {
      // Document not found or not deleted
      console.error(`Error deleting ${filename}`);
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
</script>

<AuthCheck>
  <div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4">
    <div class="flex flex-col items-center">
      <NavBar />
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
                  <strong>{document.name}</strong> ({document.size} bytes)
                </p>
              </div>
              <button
                class="btn btn-error"
                on:click={() => handleDeleteDocument(document.name)}
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
