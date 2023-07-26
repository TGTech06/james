<script lang="ts">
  // Import necessary functions from your existing script
  import { chatWithDoc } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/question.js";
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";
  import { onMount, onDestroy } from "svelte";
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
  import { v4 as uuidv4 } from "uuid";

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

  async function createNewChat() {
    const userId = await getCurrentUserId();
    const newChatId = uuidv4(); // Generate a new UUID for the chat_id

    // Save the new chat to Supabase
    const { data, error } = await supabaseClient.from("chats").insert([
      {
        user_id: userId,
        chat_id: newChatId,
        message: "", // You can leave the first message empty or set a default message
        is_user_message: true,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error creating new chat:", error.message);
    } else {
      // Add the new chat to the userChats store
      userChats.update((chats) => [...chats, { chat_id: newChatId }]);
    }
  }

  // async function loadUserChats() {
  //   const userId = await getCurrentUserId();

  //   // Fetch user chats from Supabase based on the user ID
  //   const { data: chats, error } = await supabaseClient
  //     .from("chats")
  //     .select("chat_id")
  //     .eq("user_id", userId);

  //   if (error) {
  //     console.error("Error fetching user chats:", error.message);
  //   } else {
  //     // Filter out duplicate chat IDs
  //     const uniqueChats = chats.reduce((acc, chat) => {
  //       if (!acc.find((item) => item.chat_id === chat.chat_id)) {
  //         acc.push(chat);
  //       }
  //       return acc;
  //     }, []);

  //     userChats.set(uniqueChats);
  //   }
  // }
  async function getFirstUserMessage(chatId) {
    // Fetch the first user message from Supabase based on the chat ID
    const { data: messages, error } = await supabaseClient
      .from("chats")
      .select("message")
      .eq("chat_id", chatId)
      .eq("is_user_message", true)
      .order("timestamp", { ascending: true })
      .range(1, 2);

    if (error) {
      console.error("Error fetching first user message:", error.message);
      return ""; // Return an empty string if an error occurs
    }

    // Check if any messages were found and return the first user message
    return messages.length > 0 ? messages[0].message : "";
  }

  // Function to load user chats with the first user message

  async function loadUserChats() {
    const userId = await getCurrentUserId();

    // Fetch user chats from Supabase based on the user ID
    const { data: chats, error } = await supabaseClient
      .from("chats")
      .select("chat_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching user chats:", error.message);
    } else {
      // Create a Set to keep track of unique chat IDs
      const uniqueChatIds = new Set();

      // Create an array to store the processed user chats
      const processedChats = [];

      // Loop through each chat and add it to the processedChats array only if it's unique
      for (const chat of chats) {
        if (!uniqueChatIds.has(chat.chat_id)) {
          uniqueChatIds.add(chat.chat_id);

          const firstUserMessage = await getFirstUserMessage(chat.chat_id);

          // Add the chat with the first user message to the processedChats array
          processedChats.push({ ...chat, firstUserMessage });
        }
      }

      // Update the userChats store with the processed chats
      userChats.set(processedChats);
    }
  }
  // Function to load selected chat messages when a chat is clicked
  async function loadChatMessages(chatId) {
    selectedChatId = chatId; // Update the selected chat ID
    // Fetch chat messages from Supabase based on the chat ID
    const { data: messages, error } = await supabaseClient
      .from("chats")
      .select("message, is_user_message, timestamp") // Include 'timestamp' in the selection
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

    // Trigger loading of the updated chat messages
    loadChatMessages(selectedChatId);
    await getAIResponse(userId);
  }

  // Function to load AI response for a chat
  async function sendUserMessageAndAIResponse() {
    const userId = await getCurrentUserId(); // Fetch the authenticated user's ID from Supabase Auth
    console.log("userId", userId);
    await sendMessage(userId); // Send the user message to the database
    // Get the AI response and save it to the database
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
    question = "";
  }

  async function getCurrentUserId() {
    const user = await supabaseClient.auth.getUser();
    return user ? user.data.user.id : null; // Return the user ID or null if user is not authenticated
  }

  function selectChat(chatId) {
    loadChatMessages(chatId);
  }

  async function deleteChat(chatId) {
    // Delete the chat from the database
    const { data, error } = await supabaseClient
      .from("chats")
      .delete()
      .eq("chat_id", chatId);

    if (error) {
      console.error("Error deleting chat:", error.message);
    } else {
      // Fetch and load user chats again to update the chat list
      await loadUserChats();
      // Clear the selected chat messages
      selectedChatMessages.set([]);
      // Set the selectedChatId to null
      selectedChatId = null;
    }
  }

  onMount(() => {
    // Fetch and load user chats on component mount
    loadUserChats();
  });

  // async function sendUserMessageAndAIResponse() {
  //   await sendMessage(); // Send the user message to the database
  //   await getAIResponse(); // Get the AI response
  // }
  let isChatHistorySidebarOpen = false;
  let isConfigurationSidebarOpen = false;

  // Function to toggle the chat history sidebar visibility
  function toggleChatHistorySidebar() {
    console.log("toggleChatHistorySidebar");
    isChatHistorySidebarOpen = !isChatHistorySidebarOpen;
  }

  // Function to toggle the configuration sidebar visibility
  function toggleConfigurationSidebar() {
    console.log("toggleConfigurationSidebar");
    isConfigurationSidebarOpen = !isConfigurationSidebarOpen;
  }

  // Responsive layout logic for mobile view
  let isMobile = false;
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  function handleMobileViewChange(event) {
    isMobile = event.matches;
  }

  onMount(() => {
    isMobile = mediaQuery.matches;
    mediaQuery.addListener(handleMobileViewChange);
  });

  onDestroy(() => {
    mediaQuery.removeListener(handleMobileViewChange);
  });
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>
<AuthCheck>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white p-4">
    <NavBar />
    <div class="grid">
      <!-- Left Sidebar - Chat History -->
      <div
        class="col-span-3 bg-gray-800 rounded-lg p-4 sidebar"
        class:open={!isMobile && isChatHistorySidebarOpen}
      >
        <h2 class="text-2xl font-bold mb-4">Chat History</h2>
        <!-- Add a button to create a new chat -->
        <button class="btn btn-primary btn-sm mb-2" on:click={createNewChat}>
          <i class="fas fa-plus" /> New Chat
        </button>

        <div class="overflow-y-auto h-96">
          {#each $userChats as chat}
            <div
              class="flex items-center justify-between mb-2"
              on:click={() => selectChat(chat.chat_id.slice(0, 36))}
            >
              {#if chat.firstUserMessage !== "" && chat.firstUserMessage !== null}
                <span>{chat.firstUserMessage}</span>
              {:else}
                <span>New Chat</span>
              {/if}
              <!-- Add a button to delete the chat -->
              <button
                class="btn btn-error btn-sm"
                on:click={() => deleteChat(chat.chat_id)}
              >
                <i class="fas fa-trash-alt" />
              </button>
            </div>
          {/each}
        </div>
      </div>

      <!-- Middle Section - Chat Messages -->
      <div class="col-span-6">
        <div class="col-span-6">
          <h1 class="text-4xl font-bold mb-8">Chat Messages</h1>
          {#if selectedChatId === null}
            <p class="text-gray-500">
              Select a chat from the history to view messages.
            </p>
          {:else}
            <div class="chat-container overflow-y-auto h-96">
              {#each $selectedChatMessages as message}
                <div
                  class="chat-message"
                  class:is-user-message={message.is_user_message}
                >
                  {message.message}
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Ask AI Box -->
        <div class="col-span-9">
          <div class="form-control mb-4">
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
        </div>
      </div>

      <!-- Right Sidebar - Configuration -->
      <div
        class="col-span-3 bg-gray-800 rounded-lg p-4 sidebar"
        class:open={!isMobile && isConfigurationSidebarOpen}
      >
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
    </div>

    <!-- Toggle buttons to open sidebars -->
    <div
      class="toggle-btn toggle-chat-history-btn"
      on:click={() => toggleChatHistorySidebar()}
      class:visible={!isMobile || !isChatHistorySidebarOpen}
    >
      ☰
    </div>
    <div
      class="toggle-btn toggle-configuration-btn"
      on:click={() => toggleConfigurationSidebar()}
      class:visible={!isMobile || !isConfigurationSidebarOpen}
    >
      ☰
    </div>
  </div></AuthCheck
>

<style>
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
  .grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: auto;
    gap: 1rem;
  }

  .col-span-3 {
    grid-column: span 3;
  }

  .col-span-6 {
    grid-column: span 6;
  }

  /* Sidebar styles */
  .sidebar {
    position: relative;
    z-index: 1;
    display: none;
  }

  /* Sidebar visibility based on the 'open' class */
  .sidebar.open {
    display: block;
  }

  /* Toggle buttons styles */
  .toggle-btn {
    position: fixed;
    bottom: 10px;
    padding: 10px;
    border-radius: 50%;
    background-color: #333;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    z-index: 2;
    display: none;
  }

  /* Toggle button visibility */
  .toggle-btn.visible {
    display: block;
  }

  /* Button positions */
  .toggle-chat-history-btn {
    left: 20px;
  }

  .toggle-configuration-btn {
    right: 20px;
  }

  /* Additional global styles go here */
</style>
