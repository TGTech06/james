<script lang="ts">
  // Import necessary functions from your existing script
  import { file_uploader, upload_file, url_uploader } from "$lib/files.js";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";
  import { createClient } from "@supabase/supabase-js";
  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { onMount } from "svelte";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
    PUBLIC_OPENAI_API_KEY,
  } from "$env/static/public";
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";
  // import { OpenAI } from "langchain/dist";

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
  const authorizedExtensions = [
    ".c",
    ".cpp",
    ".csv",
    ".docx",
    ".html",
    ".java",
    ".json",
    ".md",
    ".pdf",
    ".php",
    ".pptxt",
    ".py",
    ".rb",
    ".tex",
    ".txt",
    ".css",
    ".jpeg",
    ".jpg",
    ".js",
    ".gif",
    ".png",
    ".tar",
    ".ts",
    ".xlsx",
    ".xml",
    ".zip",
  ];

  onMount(() => {
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    let embeddings = new OpenAIEmbeddings({ openAIApiKey });
    // embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    // });
    vector = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "documents",
    });
  });

  async function handleFileUpload() {
    // try {
    // await file_uploader(supabase, PUBLIC_HUGGINGFACE_API_KEY, vector, files);
    console.log("uploading file");
    try {
      await upload_file(files);
    } catch (err) {
      error = err.message;
    }

    // let assistant = client.beta.assistants.create(
    //   instructions="You are a customer support chatbot. Use your knowledge base to best respond to customer queries.",
    //   model="gpt-3.5",
    //   tools=[{"type": "retrieval"}],
    //   file_ids=[file.id]
    // )
    error = "";
    // } catch (err) {
    //   error = err.message;
    // }
  }

  async function handleUrlUpload() {
    // try {
    await url_uploader(supabase, PUBLIC_HUGGINGFACE_API_KEY, vector, url);
    error = "";
    // } catch (err) {
    //   error = err.message;
    // }
  }
</script>

<AuthCheck>
  <div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4">
    <div class="flex flex-col items-center">
      <NavBar />
      <div class="p-4 md:p-8 flex flex-col items-center h-screen">
        <h1 class="text-2xl md:text-4xl font-bold mb-4 md:mb-8">
          Insert Data Page
        </h1>
        <!-- Error Display -->
        {#if error}
          <div class="text-red-500 mb-4">{error}</div>
        {/if}

        <!-- File Uploader -->
        <div class="w-full mb-4 md:mb-8">
          <label class="label mb-2 text-lg font-bold">Upload Files</label>
          <div class="flex flex-col md:flex-row items-center">
            <input
              type="file"
              multiple
              on:change={upload}
              accept={authorizedExtensions.join(",")}
              required
              class="input input-accent mr-0 md:mr-4 mb-2 md:mb-0"
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
          <div class="flex flex-col md:flex-row items-center">
            <textarea
              bind:value={url}
              class="textarea textarea-accent resize-none flex-grow text-lg font-bold mb-2 md:mb-0 md:mr-4"
              rows="1"
            />
            <button
              class="btn btn-primary text-lg font-bold"
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
