<script lang="ts">
  // Import necessary functions from your existing script
  import { chatWithDoc } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/question.js";
  import { onMount } from "svelte";
  import { createClient } from "@supabase/supabase-js";
  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
  } from "$env/static/public";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";
  import AuthCheck from "$lib/AuthCheck.svelte";

  // Initialize the Supabase client and other variables
  let supabase;
  let vector;
  let embeddings;
  let model = "tiiuae/falcon-7b-instruct";
  let temperature = 0.2;
  let question = "";
  let responseText = "";

  // Add any additional functions specific to the ask page, if needed

  // Bind the functions to the corresponding elements in the ask.html file, if needed
  async function getAIResponse() {
    const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    });
    // const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    // embeddings = new OpenAIEmbeddings({ openAIApiKey });
    vector = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "documents",
    });

    let response = await chatWithDoc(
      PUBLIC_HUGGINGFACE_API_KEY,
      vector,
      model,
      temperature,
      question
    );
    responseText = response;
  }
</script>

<AuthCheck>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white p-4">
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

      <div
        class="grid grid-cols-12 min-h-screen gap-4 bg-gray-900 text-white p-8"
      >
        <!-- Configuration Sidebar -->
        <div class="col-span-3 bg-gray-800 rounded-lg p-4">
          <h2 class="text-2xl font-bold mb-4">Configuration</h2>
          <p class="mb-4">
            Choose your model and temperature for asking questions.
          </p>
          <div class="form-control">
            <label for="model">Model</label>
            <select id="model" bind:value={model} class="input input-primary">
              <option value="tiiuae/falcon-7b-instruct"
                >tiiuae/falcon-7b-instruct</option
              >
              <option value="meta-llama/Llama-2-70b-chat-hf"
                >meta-llama/Llama-2-70b-chat-hf</option
              >
              <option value="OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5"
                >OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5</option
              >
            </select>
          </div>
          <div class="form-control mt-4">
            <label for="temperature">Temperature</label>
            <input
              type="range"
              id="temperature"
              min="0.1"
              max="1.0"
              step="0.2"
              bind:value={temperature}
              class="input input-primary"
            />
            <span class="text-sm ml-2">{temperature}</span>
          </div>
        </div>

        <!-- Ask the AI functionality -->
        <div class="col-span-9">
          <h1 class="text-4xl font-bold mb-8">Ask AI Page</h1>
          <div class="form-control mb-4">
            <label for="question" class="label">Your Question</label>
            <textarea
              bind:value={question}
              id="question"
              class="textarea textarea-primary"
            />
          </div>
          <button class="btn btn-primary mb-4" on:click={() => getAIResponse()}
            >Ask the AI</button
          >

          <!-- Display the generated text -->
          <div class="bg-gray-800 p-4 rounded-lg">
            <p class="text-xl mb-2">Generated Text:</p>
            <div id="displayTextContainer" class="text-gray-200">
              {responseText}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</AuthCheck>

<style>
  /* Additional global styles go here */

  /* Style the sidebar elements */
  .form-control label {
    font-size: 1rem;
  }

  /* Style the temperature slider span */
  .form-control span {
    font-size: 0.75rem;
  }

  /* Style the AI response text container */
  #displayTextContainer {
    white-space: pre-wrap; /* Preserve line breaks */
  }
</style>
