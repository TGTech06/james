<script>
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

<h1>Ask AI Page</h1>
<!-- Your ask page content -->
<!-- ... -->

<!-- Add navigation buttons to move between pages -->
<!-- ... -->

<!-- Configuration Sidebar -->
<div class="sidebar">
  <h2>Configuration</h2>
  <p>Choose your model and temperature for asking questions.</p>
  <div class="select">
    <label for="model">Model</label>
    <select id="model" bind:value={model}>
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
  <div class="slider">
    <label for="temperature">Temperature</label>
    <input
      type="range"
      id="temperature"
      min="0.1"
      max="1.0"
      step="0.2"
      bind:value={temperature}
    />
    <span>{temperature}</span>
  </div>
</div>

<!-- Ask the AI functionality -->
<div class="content">
  <textarea bind:value={question} />
  <button class="btn btn-primary" on:click={() => getAIResponse()}
    >Ask the AI</button
  >
</div>

<!-- Display the generated text -->
<p>Generated Text:</p>
<div id="displayTextContainer">
  {responseText}
</div>
