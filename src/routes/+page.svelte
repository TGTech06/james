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
  import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
  } from "$env/static/public";
  import AuthCheck from "$lib/AuthCheck.svelte";
  import Insert from "./insert.svelte";
  import Ask from "./ask.svelte";
  import Forget from "./forget.svelte";

  //import { enhance, type SubmitFunction } from '$app/forms';

  // import type { PageData } from "./$types";

  /// export let data: PageData;

  // const submitLogout: SubmitFunction = async ({ cancel }) => {
  // 	const { error } = await supabaseClient.auth.signOut();
  // 	if (error) {
  // 		console.log(error);
  // 	}
  // 	cancel();
  // };

  let mode = writable("Add Knowledge");
  let model = writable("tiiuae/falcon-7b-instruct");
  let temperature = writable(0.2);
  let chunkSize = writable(500);
  let chunkOverlap = writable(0);

  let files;
  let url;
  let question = "";

  // Initialize the Supabase client and other variables
  // const supabase_url = "https://jqfandcxceztebtpwzxd.supabase.co";
  // const supabase_key =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4";
  // const openai_api_key = "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";
  // const openAIApiKey = "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";
  // const huggingfacehub_api_token = "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";
  /**
   * @type {null}
   */
  let supabase;
  let vector;
  let embeddings;

  let retrievedText = "";

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.reload();
    }
  }

  async function getAIResponse() {
    let response = await chatWithDoc(
      PUBLIC_HUGGINGFACE_API_KEY,
      vector,
      model,
      temperature,
      question
    );

    const displayTextContainer = document.getElementById(
      "displayTextContainer"
    );

    // Set the content of the div element to the retrieved text
    displayTextContainer.textContent = response;
  }

  onMount(() => {
    // if (data.session) {
    //   console.log(data.session.data.session);
    // }
    // Initialize the Supabase client
    // @ts-ignore
    supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    //   embeddings = new OpenAIEmbeddings({ openAIApiKey });
    //   vector = new SupabaseVectorStore(embeddings,  {
    //   supabase,
    //   tableName: "documents",
    // });

    console.log("public_supabase_url", PUBLIC_SUPABASE_URL);
    console.log("public_supabase_key", PUBLIC_SUPABASE_KEY);

    const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    // const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    // embeddings = new OpenAIEmbeddings({ openAIApiKey });
    embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    });
    vector = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "documents",
    });
    // console.log(fetchRandomValue());
  });
  async function upload(e: any) {
    files = e.target.files[0];
  }
</script>

<AuthCheck>
  <div class="app-container">
    <div class="app-header">
      <h1>🧠🧠 James 🧠🧠</h1>
      <p>
        He will remember everything you tell him and answer your questions.
        (Please let me know if I have to discipline him. He's still learning,
        and any feedback is welcome!)
      </p>
    </div>

    <!-- Render different components based on the selected mode -->
    {#if $mode === "Add Knowledge"}
      <Insert />
    {:else if $mode === "Chat with your Brain"}
      <Ask />
    {:else if $mode === "Forget"}
      <Forget />
    {/if}

    <!-- Add navigation buttons to move between pages -->
    <div>
      <button on:click={() => ($mode = "Add Knowledge")}
        >Go to Add Knowledge</button
      >
      <button on:click={() => ($mode = "Chat with your Brain")}
        >Go to Chat with your Brain</button
      >
      <button on:click={() => ($mode = "Forget")}>Go to Forget</button>
    </div>
  </div>
  <button class="btn btn-secondary" on:click={() => signOutUser()}
    >Logout</button
  >
</AuthCheck>

<!-- <button class="btn btn-secondary" on:click={() => signOutUser()}
    >Logout</button
  >
</AuthCheck> -->

<style>
  /* Add your CSS styles here to match the Streamlit app's appearance */
  /* Example: .app-title { font-size: 24px; } */
</style>
