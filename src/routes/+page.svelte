<script lang="ts">
  import { onMount } from "svelte";

  // Add your imports here
  import {
    file_uploader,
    url_uploader,
  } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/files.js";
  import { chatWithDoc } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/question.js";
  import { brain } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/brain.js";
  import { createClient } from "@supabase/supabase-js";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";
  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { writable } from "svelte/store";

  // Create the session state variables
  let model = writable("tiiuae/falcon-7b-instruct");
  let temperature = writable(0.2);
  let chunkSize = writable(500);
  let chunkOverlap = writable(0);

  let files;
  let url;

  // Initialize the Supabase client and other variables
  const supabase_url = "https://jqfandcxceztebtpwzxd.supabase.co";
  const supabase_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4";
  const openai_api_key = "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";
  const openAIApiKey = "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";
  const huggingfacehub_api_token = "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";
  /**
   * @type {null}
   */
  let supabase;
  let vectorStore;
  let embeddings;

  onMount(() => {
    // Initialize the Supabase client
    // @ts-ignore
    supabase = createClient(supabase_url, supabase_key);
    embeddings = new OpenAIEmbeddings({ openAIApiKey });
    vectorStore = new vectorStore.SupabaseVectorStore(supabase, embeddings, {
      tableName: "documents",
    });
  });

  //   // Call the file uploader function
  //   file_uploader(supabase, openai_api_key, vectorStore);

  //   // Call the URL uploader function
  //   url_uploader(supabase, openai_api_key, vectorStore);

  async function upload(e: any) {
    files = e.target.files[0];
  }

  // Set the theme
  // You can customize the theme using CSS classes and styles
  // to match the Streamlit app's appearance
  // Example: <div class="app-title">🧠🧠 James 🧠🧠</div>
</script>

<div class="app-container">
  <div class="app-header">
    <h1>🧠🧠 James 🧠🧠</h1>
    <p>
      He will remember everything you tell him and answer your questions.
      (Please let me know if I have to discipline him. He's still learning, and
      any feedback is welcome!)
    </p>
  </div>
  <div class="app-content">
    <!-- Display the action selection radio buttons -->
    <div class="action-selection">
      <input
        type="radio"
        bind:group={model}
        value="Add Knowledge"
        id="add-knowledge"
      />
      <label for="add-knowledge">Add Knowledge</label>

      <input
        type="radio"
        bind:group={model}
        value="Chat with your Brain"
        id="chat-with-brain"
      />
      <label for="chat-with-brain">Chat with your Brain</label>

      <input type="radio" bind:group={model} value="Forget" id="forget" />
      <label for="forget">Forget</label>
    </div>

    {#if $model === "Add Knowledge"}
      <!-- Display the configuration sidebar for adding knowledge -->
      <div class="sidebar">
        <h2>Configuration</h2>
        <p>Choose your chunk size and overlap for adding knowledge.</p>
        <div class="slider">
          <label for="chunk-size">Chunk Size</label>
          <input
            type="range"
            id="chunk-size"
            min="100"
            max="1000"
            step="50"
            bind:value={$chunkSize}
          />
          <span>{$chunkSize}</span>
        </div>
        <div class="slider">
          <label for="chunk-overlap">Chunk Overlap</label>
          <input
            type="range"
            id="chunk-overlap"
            min="0"
            max="100"
            step="10"
            bind:value={$chunkOverlap}
          />
          <span>{$chunkOverlap}</span>
        </div>
      </div>

      <!-- Display the file uploader and URL uploader -->
      <div class="content">
        <div class="file-uploader">
          <input type="file" multiple on:change={upload} />
          <button
            on:click={() =>
              file_uploader(supabase, openai_api_key, vectorStore, files)}
            >Upload Files</button
          >
        </div>
        <div class="url-uploader">
          <textarea bind:value={url} />
          <button
            on:click={() =>
              url_uploader(supabase, openai_api_key, vectorStore, url)}
            >Add the URL to the database</button
          >
        </div>
        <!-- <div class="file-uploader">
          {file_uploader(supabase, openai_api_key, vectorStore)}
        </div>
        <div class="url-uploader">
          {url_uploader(supabase, openai_api_key, vectorStore)}
        </div> -->
      </div>
    {:else if $model === "Chat with your Brain"}
      <!-- Display the configuration sidebar for asking questions -->
      <div class="sidebar">
        <h2>Configuration</h2>
        <p>Choose your model and temperature for asking questions.</p>
        <div class="select">
          <label for="model">Model</label>
          <select id="model" bind:value={$model}>
            <option value="tiiuae/falcon-7b-instruct"
              >tiiuae/falcon-7b-instruct</option
            >
            <option value="OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5"
              >OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5</option
            >
          </select>
        </div>
        <div class="slider">
          <label for="temperature">Temperature</label>
          <input
            type="range"
            id="temperature"
            min="0.1"
            max="1.0"
            step="0.2"
            bind:value={$temperature}
          />
          <span>{$temperature}</span>
        </div>
      </div>

      <!-- Display the chat with brain functionality -->
      <div class="content">
        {chatWithDoc(huggingfacehub_api_token, vectorStore, model, temperature)}
      </div>
    {:else if $model === "Forget"}
      <!-- Display the configuration sidebar for forgetting knowledge -->
      <div class="sidebar">
        <h2>Configuration</h2>
        <!-- Add your configuration options here for forgetting knowledge -->
      </div>

      <!-- Display the brain forgetting functionality -->
      <div class="content">
        {brain(supabase)}
      </div>
    {/if}
  </div>
</div>

<style>
  /* Add your CSS styles here to match the Streamlit app's appearance */
  /* Example: .app-title { font-size: 24px; } */
</style>
