<script lang="ts">
  import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase.js";
  /**
   * @type {null}
   */
  let userLoggedIn = false;

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
    <img
      loading="lazy"
      src="logo.png"
      class="aspect-[1] object-contain object-center overflow-hidden self-center my-auto"
      style="height: 50vh"
    />
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
        Please provide feedback and suggestions to help him become even better!
      </p>
    </div>

    {#if userLoggedIn}
      <button
        class="btn btn-primary btn-lg mt-8 rounded-md uppercase text-white"
        on:click={() => (window.location.href = "/chat")}
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

    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfQ7PzxsJTkTPiQp9HAU4v4hLWhN-2H-i5rNyWlH3hc-m1JcQ/viewform?usp=sf_link
"
    >
      <button class="btn btn-active btn-neutral m-4">Give feedback</button>
    </a>
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
          You can upload your research papers and James will help you with your
          research. He can make a summary of the findings of the paper, comment
          on the reliability and help you with the citations.
        </p>
      </div>
      <div
        class="bg-white p-6 rounded-lg border border-blue-600 space-y-4 text-black"
      >
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Study">🧠</span>
        </div>
        <h3 class="text-2xl font-bold text-center">Studying</h3>
        <p class="text-lg text-center">
          With James by your side, you can study more effectively. You can give
          him your specification and he will go through it with you. Making
          flashcards, answering questions, and even helping you with your
          homework.
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
          If you are working with python he can actually run the code in a
          virtual environment so he is far more reliable when he gives you an
          answer.
        </p>
      </div>
      <div
        class="bg-white p-6 rounded-lg border border-blue-600 space-y-4 text-black"
      >
        <div class="flex items-center justify-center mb-4">
          <span class="text-8xl" role="img" aria-label="Mindmapping">💬</span>
        </div>
        <h3 class="text-2xl font-bold text-center">Mindmapping</h3>
        <p class="text-lg text-center">
          You can ask James to make a mindmap on the topic you want to learn. He
          can make it with the Python library Graphviz if you allow him to use
          code interpreter, or he can make it in any format to import into your
          favorite mindmapping software. If you upload files he can use them to
          make the mindmap.
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
