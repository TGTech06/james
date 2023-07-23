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

<h1>Forget Data Page</h1>
<div id="displayTextContainer">
  {#each documents as document}
    <p>
      <strong>{document.name}</strong> ({document.size} bytes)
      <button on:click={() => handleDeleteDocument(document.name)}>❌</button>
    </p>
  {/each}
</div>
<!-- Your forget page content -->
<!-- ... -->

<!-- Add navigation buttons to move between pages -->
<!-- ... -->
