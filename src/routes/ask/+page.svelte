<script lang="ts">
  // Import necessary functions from your existing script
  import { chatWithDoc } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/question.js";
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";
  import { onMount, onDestroy } from "svelte";
  import { GoTrueAdminApi, createClient } from "@supabase/supabase-js";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";
  import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
  import { writable } from "svelte/store";
  import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_HUGGINGFACE_API_KEY,
    PUBLIC_OPENAI_API_KEY,
  } from "$env/static/public";
  import { v4 as uuidv4 } from "uuid";
  // Initialize the Supabase client and other variables
  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  let vector;
  let embeddings;
  let model = "tiiuae/falcon-7b-instruct";
  let temperature = 0.2;
  let question = "";
  let loading = false;
  let errorText = null;
  let responseText = "";

  // Store to hold list of user chats
  const userChats = writable([]);
  // Store to hold selected chat messages
  const selectedChatMessages = writable([]);
  // Store to hold the currently selected chat ID
  let selectedChatId = null;

  // async function createNewChat() {
  //   const userId = await getCurrentUserId();
  //   // if (selectedChatId !== null) {
  //   // Check if the selected chat has messages
  //   const { data: messages, error } = await supabaseClient
  //     .from("chats")
  //     .select("message")
  //     .eq("chat_id", selectedChatId);

  //   if (error) {
  //     console.error("Error fetching chat messages:", error.message);
  //     return;
  //   }

  //   if (messages.length > 0) {
  //     // If the selected chat has messages, prevent creating a new chat
  //     return;
  //   }
  //   // }

  //   const newChatId = uuidv4(); // Generate a new UUID for the chat_id

  //   // Add the new chat to the userChats store
  //   userChats.update((chats) => [...chats, { chat_id: newChatId }]);
  //   // Set the newly created chat as the selected chat
  //   selectedChatId = newChatId;
  // }
  async function createNewChat() {
    if (loading) return;
    const userId = await getCurrentUserId();
    if (selectedChatId !== null) {
      // Check if the selected chat has messages
      const { data: messages, error } = await supabaseClient
        .from("chats")
        .select("message")
        .eq("chat_id", selectedChatId);

      if (error) {
        errorText = error.message;
        return;
      }

      // if (messages.length > 0) {
      //   // If the selected chat has messages, prevent creating a new chat
      //   return;
      // }
    }

    // Create a new chat with a temporary chat_id (not saved to the database yet)
    const newChatId = uuidv4();

    // Add the new chat to the userChats store
    userChats.update((chats) => [...chats, { chat_id: newChatId }]);
    // Set the newly created chat as the selected chat
    selectedChatId = newChatId;
    selectedChatMessages.set([]);
  }

  async function getFirstUserMessage(chatId) {
    // Fetch the first user message from Supabase based on the chat ID
    const { data: messages, error } = await supabaseClient
      .from("chats")
      .select("message")
      .eq("chat_id", chatId)
      .eq("is_user_message", true)
      .order("timestamp", { ascending: true })
      .limit(1);

    if (error) {
      errorText = error.message;
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
      errorText = error.message;
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
      errorText = error.message;
    } else {
      selectedChatMessages.set(messages);
    }
  }

  // async function sendMessage(userId) {
  //   if (selectedChatId === null) {
  //     // If there is no selected chat, create a new one first
  //     await createNewChat();
  //   }

  //   // Save the user message to Supabase
  //   await supabaseClient.from("chats").insert([
  //     {
  //       user_id: userId,
  //       chat_id: selectedChatId,
  //       message: question,
  //       is_user_message: true,
  //       timestamp: new Date().toISOString(),
  //     },
  //   ]);

  //   // Clear the question input field

  //   // Trigger loading of the updated chat messages
  //   loadChatMessages(selectedChatId);
  //   await getAIResponse(userId);
  // }
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
    if ($selectedChatMessages.length === 0) {
      loadUserChats();
    }
    // Trigger loading of the updated chat messages
    loadChatMessages(selectedChatId);
  }

  // Function to load AI response for a chat
  async function sendUserMessageAndAIResponse() {
    if (loading) return; // Prevent sending the message if a previous message is still being sent
    loading = true;
    const userId = await getCurrentUserId(); // Fetch the authenticated user's ID from Supabase Auth
    await sendMessage(userId); // Send the user message to the chat
    // Send the user message to the database
    // Get the AI response and save it to the database
    await getAIResponse(userId);
    loading = false;
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
    // embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    // });
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    embeddings = new OpenAIEmbeddings({ openAIApiKey });
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
    return user ? user.data.user.id : null; // Return the user ID or null if the user is not authenticated
  }

  function selectChat(chatId) {
    loadChatMessages(chatId);
  }

  async function deleteChat(chatId) {
    if (loading) return; // Prevent deleting the chat if a previous deletion is still in progress
    // Check if the deleted chat is the current chat
    const isCurrentChat = selectedChatId === chatId;

    // Delete the chat from the database
    const { data, error } = await supabaseClient
      .from("chats")
      .delete()
      .eq("chat_id", chatId);

    if (error) {
      console.error("Error deleting chat:", error.message);
      errorText = error.message;
    } else {
      // Fetch the most recent chat ID from the user's chats after deleting the current chat
      const userId = await getCurrentUserId();
      const { data: chats } = await supabaseClient
        .from("chats")
        .select("chat_id")
        .eq("user_id", userId)
        .order("timestamp", { ascending: false })
        .limit(1);

      const mostRecentChatId = chats.length > 0 ? chats[0].chat_id : null;

      // Fetch and load user chats again to update the chat list with the most recent chat ID
      await loadUserChats();

      // Clear the selected chat messages
      // selectedChatMessages.set([]);

      // Set the selectedChatId to the most recent chat ID only if the deleted chat was the current chat
      if (isCurrentChat) {
        selectedChatId = mostRecentChatId;
      }
    }
  }

  onMount(async () => {
    // Fetch and load user chats on component mount
    await loadUserChats();
    await createNewChat();
  });

  let isChatHistorySidebarOpen = false;

  // Function to toggle the combined sidebar visibility
  function toggleSidebar() {
    isChatHistorySidebarOpen = !isChatHistorySidebarOpen;
  }

  // Responsive layout logic for mobile view
  // const mediaQuery = window.matchMedia("(max-width: 768px)");

  // function handleMobileViewChange(event) {
  //   isMobile = event.matches;
  // }

  // onMount(() => {
  //   isMobile = mediaQuery.matches;
  //   mediaQuery.addListener(handleMobileViewChange);
  // });

  // onDestroy(() => {
  //   mediaQuery.removeListener(handleMobileViewChange);
  // });
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>
<AuthCheck>
  <div class="flex flex-col bg-gray-900 text-white p-4">
    <NavBar />
    <div class="relative flex flex-col md:flex-row min-h-screen">
      <!-- Combined Sidebar - Chat History and Configuration -->

      {#if isChatHistorySidebarOpen}
        <div class="absolute left-0 top-0 bg-gray-800 rounded-lg p-4 sidebar">
          <div class="overflow-y-auto max-h-96">
            <div class="w-full md:w-3/4 mt-14">
              <div class="mb-4">
                <label class="block text-lg font-semibold" for="model"
                  >Select Model</label
                >
                <select
                  id="model"
                  bind:value={model}
                  style="width: 200px;"
                  class="select select-sm select-primary"
                >
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
              <div class="mb-4">
                <label class="block text-lg font-semibold" for="temperature"
                  >Temperature</label
                >
                <input
                  type="range"
                  id="temperature"
                  min="0.1"
                  max="1.0"
                  step="0.2"
                  bind:value={temperature}
                  class="input input-sm input-primary"
                />
                <span class="text-sm ml-2">{temperature}</span>
              </div>
            </div>

            <h2 class="text-2xl font-bold mb-4">Chat History</h2>
            <!-- Add a button to create a new chat -->
            <button
              class="btn btn-primary btn-sm mb-2"
              on:click={createNewChat}
            >
              <i class="fas fa-plus" /> New Chat
            </button>

            <!-- <div class="overflow-y-auto h-96"> -->
            {#each $userChats as chat}
              <div
                class="flex items-center justify-between mb-2"
                on:click={() => selectChat(chat.chat_id.slice(0, 36))}
              >
                {#if chat.firstUserMessage !== "" && chat.firstUserMessage !== null && chat.firstUserMessage !== undefined}
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
      {/if}

      <div
        class="sidebar-toggle-btn"
        style=" left: 1rem"
        on:click={() => toggleSidebar()}
      >
        {#if isChatHistorySidebarOpen}
          <i class="chevron fas fa-chevron-left text-2xl" />
        {:else}
          <i class="chevron fas fa-chevron-right text-2xl" />
        {/if}
      </div>

      <!-- Middle Section - Chat Messages -->
      <div
        class="flex flex-col items-center justify-center w-full md:w-3/4 mx-auto"
      >
        <div class="w-full md:w-3/4">
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
        <div class="w-full md:w-3/4 mt-4">
          <div class="form-control mb-4">
            <textarea
              bind:value={question}
              id="question"
              class="textarea textarea-primary"
              disabled={selectedChatId === null || loading}
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
    </div>
    {#if errorText !== null}
      <div
        class="absolute top-4 left-4 right-4 bg-red-600 text-white p-2 rounded"
      >
        {errorText}
      </div>
    {/if}
    <!-- Toggle button to open the combined sidebar -->
  </div>
</AuthCheck>

<style>
  .sidebar.open {
    display: block;
  }
  .sidebar-toggle-btn {
    position: absolute;
    top: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 2;
  }

  .sidebar-toggle-btn-right {
    right: 1rem;
  }

  .sidebar-toggle-btn-left {
    left: 1rem;
  }

  .sidebar-toggle-btn .chevron {
    color: #1f2937;
  }
  .flex {
    display: flex;
  }

  .flex-1 {
    flex: 1;
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

  /* Responsive layout using media queries */
  @media (max-width: 50px) {
    .md\:pl-16 {
      padding-left: 16px;
    }

    .md\:pr-16 {
      padding-right: 16px;
    }

    .md\:flex-row {
      flex-direction: row;
    }

    /* Adjust the sidebar and middle section layout on small screens */
    .sidebar {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1;
      width: 80%; /* Set the width of the sidebar on small screens */
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .middle-section {
      margin-left: 20%; /* Add margin to the middle section to make space for the sidebar */
    }
    .form-control select {
      width: 100%;
      padding: 0.5rem;
      font-size: 14px;
    }
  }
  /* Additional global styles go here */
</style>
