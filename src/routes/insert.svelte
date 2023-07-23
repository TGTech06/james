<script>
  // Import necessary functions from your existing script
  import {
    file_uploader,
    url_uploader,
  } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/files.js";
  import { createClient } from "@supabase/supabase-js";
  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
  import { onMount } from "svelte";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_OPENAI_API_KEY,
  } from "$env/static/public";

  // Initialize the Supabase client and other variables
  let supabase;
  let vector;
  let embeddings;
  let files;
  let url;

  // Add any additional functions specific to the insert page, if needed

  // Bind the functions to the corresponding elements in the insert.html file, if needed
  async function upload(e) {
    files = e.target.files[0];
  }

  onMount(() => {
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: PUBLIC_OPENAI_API_KEY,
    });
    vector = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "documents",
    });
  });

  async function handleFileUpload() {
    await file_uploader(supabase, PUBLIC_OPENAI_API_KEY, vector, files);
  }

  async function handleUrlUpload() {
    await url_uploader(supabase, PUBLIC_OPENAI_API_KEY, vector, url);
  }
</script>

<h1>Insert Data Page</h1>
<!-- Your insert page content -->
<!-- ... -->

<!-- Add navigation buttons to move between pages -->
<!-- ... -->

<!-- File Uploader -->
<input type="file" multiple on:change={upload} />
<button class="btn btn-primary" on:click={() => handleFileUpload()}
  >Upload Files</button
>

<!-- URL Uploader -->
<textarea bind:value={url} />
<button class="btn btn-primary" on:click={() => handleUrlUpload()}
  >Add the URL to the database</button
>
