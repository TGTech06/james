<script>
  import { onMount } from "svelte";
  import { createClient } from "@supabase/supabase-js";
  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
  } from "$env/static/public";
  import {
    getDocuments,
    deleteDocument,
  } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/brain.js";

  // Initialize the Supabase client and other variables
  let supabase;
  let vector;
  // Reactive statement to handle documents list
  let documents = [];

  // Bind the functions to the corresponding elements in the forget.html file, if needed
  onMount(async () => {
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    vector = new SupabaseVectorStore(
      new HuggingFaceInferenceEmbeddings({
        apiKey: PUBLIC_HUGGINGFACE_API_KEY,
      }),
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
</script>

<div class="p-8">
  <h1 class="text-4xl font-bold mb-8">Forget Data Page</h1>
  <div class="space-y-4">
    {#each documents as document}
      <div class="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
        <div>
          <p class="text-lg">
            <strong>{document.name}</strong> ({document.size} bytes)
          </p>
        </div>
        <button
          class="btn btn-error"
          on:click={() => handleDeleteDocument(document.name)}
        >
          <i class="fas fa-trash" />
        </button>
      </div>
    {/each}
  </div>
</div>

<!-- Your forget page content -->
<!-- ... -->

<!-- Add navigation buttons to move between pages -->
<!-- ... -->
