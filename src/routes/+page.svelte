<script lang="ts">
  import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase.js";
  /**
   * @type {null}
   */
  let supabase;
  let userLoggedIn = false;
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.reload();
    }
  }
  const getSessionData = async () => {
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
  });
</script>

<div class="flex flex-col min-h-screen bg-white text-black p-4">
  <a href="/profile" class="text-3xl hover:text-blue-700 cursor-pointer">
    <i style="font-size:20px" class="fa">&#xf013;</i>
  </a>
  <div class="flex flex-col items-center">
    <!-- Daisy UI Navbar -->
    <!-- <NavBar /> -->
    <h1 class="text-5xl font-bold my-8">Welcome to James</h1>

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
        class="btn btn-primary btn-lg mt-8 rounded-md uppercase text-white"
        on:click={() => (window.location.href = "/ask")}
      >
        Get Started
      </button>
    {:else}
      <button
        class="btn btn-primary btn-lg mt-8 rounded-md uppercase text-white"
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
      <div
        class="bg-white p-6 rounded-lg border border-blue-600 space-y-4 text-black"
      >
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Research">🔍</span>
        </div>
        <h3 class="text-2xl font-bold text-center">Research</h3>
        <p class="text-lg text-center">
          James can read and remember entire books, articles, and web pages. He
          can also answer your questions about what he has read, but don't try
          to trick him, he's smarter than you.
        </p>
      </div>
      <div
        class="bg-white p-6 rounded-lg border border-blue-600 space-y-4 text-black"
      >
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Study">📚</span>
        </div>
        <h3 class="text-2xl font-bold text-center">Studying</h3>
        <p class="text-lg text-center">
          With James by your side, you will probably never need to study again,
          but if you do, he can help you with that too. He can make flashcards,
          answer questions, and even help you with your homework (but don't tell
          your teacher).
        </p>
      </div>
      <div
        class="bg-white p-6 rounded-lg border border-blue-600 space-y-4 text-black"
      >
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Programming">💻</span>
        </div>
        <h3 class="text-2xl font-bold text-center">Programming</h3>
        <p class="text-lg text-center">
          James can swallow up entire documentation pages so you don't have to.
          If you have a question about a programming language or framework, he
          can hopefully answer it. He can also help you with your code, but he's
          not very good at it yet.
        </p>
      </div>
      <div
        class="bg-white p-6 rounded-lg border border-blue-600 space-y-4 text-black"
      >
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Chat">💬</span>
        </div>
        <h3 class="text-2xl font-bold text-center">Chat with Your Notes</h3>
        <p class="text-lg text-center">
          Please let James read all your personal notes and thoughts. He
          promises he won't tell anyone. He can also answer your questions and
          have a conversation with you.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .border {
    border-width: 1.5px; /* or any other thickness you prefer */
  }
</style>
