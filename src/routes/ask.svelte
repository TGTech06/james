<script>
  // Import necessary functions from your existing script
  import { chatWithDoc } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/question.js";

  import { onMount } from "svelte";
  import { createClient } from "@supabase/supabase-js";

  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { writable } from "svelte/store";
  import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
  } from "$env/static/public";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";

  // Initialize the Supabase client and other variables
  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  let vector;
  let embeddings;
  let model = "tiiuae/falcon-7b-instruct";
  let temperature = 0.2;
  let question = "";
  let responseText = "";

  // Store to hold list of user chats
  const userChats = writable([]);
  // Store to hold selected chat messages
  const selectedChatMessages = writable([]);
  // Store to hold the currently selected chat ID
  let selectedChatId = null;

  // Function to fetch and load user chats from Supabase
  async function loadUserChats() {
    // Replace 'userId' with the actual user ID or fetch it from your authentication system
    const userId = "userId";
    // Fetch user chats from Supabase based on the user ID
    // Make sure to replace 'supabaseClient' with your initialized Supabase client
    const { data: chats, error } = await supabaseClient
      .from("chats")
      .select("chat_id")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching user chats:", error.message);
    } else {
      userChats.set(chats);
    }
  }

  // Function to load selected chat messages when a chat is clicked
  async function loadChatMessages(chatId) {
    selectedChatId = chatId; // Update the selected chat ID
    // Fetch chat messages from Supabase based on the chat ID
    const { data: messages, error } = await supabaseClient
      .from("chats")
      .select("message, is_user_message") // Use object notation here, not an array
      .eq("chat_id", chatId)
      .order("timestamp", { ascending: true });
    if (error) {
      console.error("Error fetching chat messages:", error.message);
    } else {
      selectedChatMessages.set(messages);
    }
  }

  // Function to send a new message in the chat
  async function sendMessage(userId) {
    // Save the user message to Supabase
    // Make sure to replace 'userId' with the actual user ID or fetch it from your authentication system

    await supabaseClient.from("chats").insert([
      {
        user_id: userId,
        chat_id: selectedChatId,
        message: question,
        is_user_message: true,
        timestamp: new Date().toISOString(),
      },
    ]);
    // Clear the question input field
    question = "";
    // Trigger loading of the updated chat messages
    loadChatMessages(selectedChatId);
  }

  // Function to load AI response for a chat
  async function sendUserMessageAndAIResponse() {
    const userId = getCurrentUserId(); // Fetch the authenticated user's ID from Supabase Auth
    console.log("userId", userId);
    await sendMessage(userId); // Send the user message to the database
    await getAIResponse(userId); // Get the AI response and save it to the database
  }

  // Function to save the AI response to the database
  async function saveAIResponse(aiResponse, userId) {
    // Save the AI response to Supabase
    await supabaseClient.from("chats").insert([
      {
        user_id: userId,
        chat_id: selectedChatId,
        message: aiResponse,
        is_user_message: false,
        timestamp: new Date().toISOString(),
      },
    ]);
    // Trigger loading of the updated chat messages (including the AI response)
    loadChatMessages(selectedChatId);
  }

  // Updated function to get the AI response and save it to the database
  async function getAIResponse(userId) {
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

    // Save the AI response to the database
    await saveAIResponse(response, userId);
  }

  async function getCurrentUserId() {
    const user = await supabaseClient.auth.getUser();
    return user ? user.data.user.id : null; // Return the user ID or null if user is not authenticated
  }

  function selectChat(chatId) {
    loadChatMessages(chatId);
  }

  onMount(() => {
    // Fetch and load user chats on component mount
    loadUserChats();
  });

  // async function sendUserMessageAndAIResponse() {
  //   await sendMessage(); // Send the user message to the database
  //   await getAIResponse(); // Get the AI response
  // }
</script>

<div class="grid grid-cols-12 min-h-screen gap-4 bg-gray-900 text-white p-8">
  <!-- Configuration Sidebar -->
  <div class="col-span-3 bg-gray-800 rounded-lg p-4">
    <h2 class="text-2xl font-bold mb-4">Configuration</h2>
    <p class="mb-4">Choose your model and temperature for asking questions.</p>
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

  <div class="col-span-3 bg-gray-800 rounded-lg p-4">
    <h2 class="text-2xl font-bold mb-4">Chat History</h2>
    {#each $userChats as chat}
      <div
        class="mb-2 cursor-pointer"
        on:click={() => selectChat(chat.chat_id)}
      >
        Chat ID: {chat.chat_id}
      </div>
    {/each}
  </div>

  <div class="col-span-6">
    <h1 class="text-4xl font-bold mb-8">Chat Messages</h1>
    {#if selectedChatId === null}
      <p class="text-gray-500">
        Select a chat from the history to view messages.
      </p>
    {:else}
      <div class="chat-container">
        {#each $selectedChatMessages as message}
          <div
            class="chat-message"
            class:is-user-message={message.is_user_message}
          >
            {message.message} - {message.timestamp}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <!-- Ask the AI functionality -->
  <!-- <div class="col-span-9">
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
  <!-- <div class="bg-gray-800 p-4 rounded-lg">
      <p class="text-xl mb-2">Generated Text:</p>
      <div id="displayTextContainer" class="text-gray-200">{responseText}</div>
    </div>  -->
  <!-- </div> -->

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

    <!-- Combined button to send user message and get AI response -->
    <button
      class="btn btn-primary mb-4"
      on:click={() => sendUserMessageAndAIResponse()}
      disabled={selectedChatId === null}
    >
      Ask the AI and Send Message
    </button>

    <!-- Display the generated text -->
    <div class="bg-gray-800 p-4 rounded-lg">
      <p class="text-xl mb-2">Generated Text:</p>
      <div id="displayTextContainer" class="text-gray-200">{responseText}</div>
    </div>
  </div>
</div>

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

  .chat-container {
    height: 300px; /* Set a fixed height for chat messages display area */
    overflow-y: auto; /* Enable vertical scrolling if the messages overflow */
  }

  .chat-message {
    margin-bottom: 8px;
  }

  .chat-message.is-user-message {
    color: #ffcc00; /* Customize the user message color */
  }
</style>
