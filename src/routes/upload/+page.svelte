<script lang="ts">
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
    PUBLIC_HUGGINGFACE_API_KEY,
  } from "$env/static/public";
  import AuthCheck from "$lib/AuthCheck.svelte";

  // Initialize the Supabase client and other variables
  let supabase;
  let vector;
  let embeddings;
  let files;
  let url;
  let error = "";

  // Add any additional functions specific to the insert page, if needed

  // Bind the functions to the corresponding elements in the insert.html file, if needed
  async function upload(e) {
    files = e.target.files[0];
  }

  onMount(() => {
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    });
    vector = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "documents",
    });
  });

  async function handleFileUpload() {
    try {
      await file_uploader(supabase, PUBLIC_HUGGINGFACE_API_KEY, vector, files);
      error = "";
    } catch (err) {
      error = err.message;
    }
  }

  async function handleUrlUpload() {
    try {
      await url_uploader(supabase, PUBLIC_HUGGINGFACE_API_KEY, vector, url);
      error = "";
    } catch (err) {
      error = err.message;
    }
  }
</script>

<AuthCheck>
  <div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4">
    <div class="flex flex-col items-center">
      <nav class="w-full bg-gray-900 rounded-lg mb-6 shadow-md">
        <div
          class="navbar p-4 bg-gray-900 text-white rounded-t-lg rounded-b-lg border border-white"
        >
          <div class="flex items-center justify-center flex-1">
            <a
              href="/"
              class="text-3xl font-bold hover:text-blue-400 cursor-pointer"
            >
              James 🧠🧠
            </a>
          </div>
          <div class="flex items-center justify-center flex-1 space-x-4">
            <a href="/upload" class="text-lg text-white hover:text-blue-400">
              Upload Data
            </a>
            <a href="/ask" class="text-lg text-white hover:text-blue-400">
              Chat with James
            </a>
            <a href="/profile" class="text-lg text-white hover:text-blue-400">
              Profile
            </a>
            <!-- You can add more navigation items here if needed -->
          </div>
        </div>
      </nav>
      <div class="p-8 flex flex-col items-center h-screen">
        <h1 class="text-4xl font-bold mb-8">Insert Data Page</h1>
        <!-- Error Display -->
        {#if error}
          <div class="text-red-500 mb-4">{error}</div>
        {/if}

        <!-- File Uploader -->
        <div class="w-full mb-8">
          <label class="label mb-2 text-lg font-bold">Upload Files</label>
          <div class="flex items-center">
            <input
              type="file"
              multiple
              on:change={upload}
              class="input input-accent mr-4"
            />
            <button
              class="btn btn-primary text-lg font-bold"
              on:click={() => handleFileUpload()}
            >
              Upload Files
            </button>
          </div>
        </div>

        <!-- URL Uploader -->
        <div class="w-full">
          <label class="label mb-2 text-lg font-bold"
            >Add the URL to the database</label
          >
          <div class="flex items-center">
            <textarea
              bind:value={url}
              class="textarea textarea-accent resize-none flex-grow text-lg font-bold"
              rows="1"
            />
            <button
              class="btn btn-primary text-lg font-bold ml-4"
              on:click={() => handleUrlUpload()}
            >
              Add URL
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</AuthCheck>
<!-- Add navigation buttons to move between pages -->
<!-- ... -->
