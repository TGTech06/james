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

  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
    PUBLIC_OPENAI_API_KEY,
  } from "$env/static/public";
  import AuthCheck from "$lib/AuthCheck.svelte";

  import NavBar from "$lib/NavBar.svelte";

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
  let userLoggedIn = false;
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.reload();
    }
  }

  // async function getAIResponse() {
  //   let response = await chatWithDoc(
  //     PUBLIC_HUGGINGFACE_API_KEY,
  //     vector,
  //     model,
  //     temperature,
  //     question
  //   );

  //   const displayTextContainer = document.getElementById(
  //     "displayTextContainer"
  //   );

  //   // Set the content of the div element to the retrieved text
  //   displayTextContainer.textContent = response;
  // }

  const getSessionData = async () => {
    const supabaseClient = createClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_KEY
    );

    const {
      data: { session },
      error,
    } = await supabaseClient.auth.getSession();

    if (error) {
      console.log(error);
      return null;
    }
    if (session?.user) {
      userLoggedIn = true;
    } else {
      userLoggedIn = false;
    }

    return session;
  };

  onMount(() => {
    getSessionData();
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
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    embeddings = new OpenAIEmbeddings({ openAIApiKey });
    // embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    // });
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

<div class="flex flex-col min-h-screen bg-gray-900 text-white p-4">
  <div class="flex flex-col items-center">
    <!-- Daisy UI Navbar -->
    <NavBar />
    <h1 class="text-6xl font-bold my-8">Welcome to 🧠 James 🧠</h1>

    <div class="max-w-3xl mx-auto space-y-4">
      <p class="text-xl text-center mb-6">
        James is an AI-powered assistant that can remember everything you tell
        him and answer your questions. He is a smart and curious AI, constantly
        learning and improving with every interaction.
      </p>
      <p class="text-xl text-center mb-6">
        Whether you need help with research, have questions about various
        topics, or simply want to chat, James should be here to assist you.
        PLEASE provide feedback and suggestions to help him become even better!
      </p>
    </div>

    {#if userLoggedIn}
      <button
        class="btn btn-primary btn-lg mt-8 rounded-md uppercase"
        on:click={() => (window.location.href = "/upload")}
      >
        Get Started
      </button>
    {:else}
      <button
        class="btn btn-primary btn-lg mt-8 rounded-md uppercase"
        on:click={() => (window.location.href = "/login")}
      >
        Log In
      </button>
    {/if}

    <p class="text-xl text-center mt-8 mb-6">
      What James can help you with (when he feels like it):
    </p>

    <!-- Daisy UI Grid View to showcase features -->
    <div class="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto mb-8">
      <div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4">
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Research">🔍</span>
        </div>
        <h3 class="text-2xl font-bold text-white text-center">Research</h3>
        <p class="text-lg text-white text-center">
          James can read and remember entire books, articles, and web pages. He
          can also answer your questions about what he has read, but don't try
          to trick him, he's smarter than you.
        </p>
      </div>
      <div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4">
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Study">📚</span>
        </div>
        <h3 class="text-2xl font-bold text-white text-center">Studying</h3>
        <p class="text-lg text-white text-center">
          With James by your side, you will probably never need to study again,
          but if you do, he can help you with that too. He can make flashcards,
          answer questions, and even help you with your homework (but don't tell
          your teacher).
        </p>
      </div>
      <div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4">
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Programming">💻</span>
        </div>
        <h3 class="text-2xl font-bold text-white text-center">Programming</h3>
        <p class="text-lg text-white text-center">
          James can swallow up entire documentation pages so you don't have to.
          If you have a question about a programming language or framework, he
          can hopefully answer it. He can also help you with your code, but he's
          not very good at it yet.
        </p>
      </div>
      <div class="bg-gray-900 p-6 rounded-lg border border-blue-400 space-y-4">
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Chat">💬</span>
        </div>
        <h3 class="text-2xl font-bold text-white text-center">
          Chat with Your Notes
        </h3>
        <p class="text-lg text-white text-center">
          Please let James read all your personal notes and thoughts. He
          promises he won't tell anyone. He can also answer your questions and
          have a conversation with you.
        </p>
      </div>
    </div>
  </div>
</div>
