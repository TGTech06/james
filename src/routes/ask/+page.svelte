<script lang="ts">
  // Import necessary functions from your existing script
  import { chatWithDoc } from "$lib/question.js";
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
  import { OpenAI } from "openai";
  import { isEmptyObj } from "openai/core";
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
  let client;
  // let threadID;

  // Store to hold list of user chats
  const userChats = writable([]);
  // Store to hold selected chat messages
  const selectedChatMessages = writable([]);
  // Store to hold the currently selected chat ID
  let selectedThreadId = null;

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
    let thread = await client.beta.threads.create();
    console.log("this is what a thread looks like");
    console.log(thread.id);
    const userId = await getCurrentUserId();
    await supabaseClient.from("chats").upsert([
      {
        user_id: userId,
        chat_id: thread.id,
        message: "New chat created", // Your default or initial message
        is_user_message: false, // Indicate that it's not a user message
        timestamp: new Date().toISOString(),
      },
    ]);
    userChats.update((chats) => [...chats, { thread_id: thread.id }]);
    // Set the newly created chat as the selected chat
    selectedThreadId = thread.id;
    selectedChatMessages.set([]);
  }

  async function getFirstUserMessage(threadID) {
    try {
      // Get messages from the OpenAI thread
      let response = await client.beta.threads.messages.list(threadID);
      console.log("response", response);
      // Find the first user message
      for (const message of response.data.reverse()) {
        if (
          message.role === "user" &&
          message.content &&
          message.content.length > 0 &&
          message.content[0].type === "text"
        ) {
          // Return the first user message
          return message.content[0].text.value;
        }
      }
      // Return an empty string if no user message is found
      return "";
    } catch (e) {
      console.error("Error fetching first user message:", e);
      // Handle error as needed
      return "";
    }
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

  async function loadChatMessages(threadID) {
    // console.log("threadID = ", threadID);
    // selectedChatId = chatId; // Update the selected chat ID
    // threadID = "thread_jIBWQaQk9MFLMwPJy2wEWlDj";
    try {
      // Get messages from the OpenAI thread
      let response = await client.beta.threads.messages.list(threadID);
      console.log("response", response);

      // Display AI response messages on the screen
      let messages = [];
      for (const message of response.data) {
        if (
          message.content &&
          message.content.length > 0 &&
          message.content[0].type === "text"
        ) {
          let annotations = message.content[0].text.annotations;
          console.log("annotations", annotations);
          if (annotations !== undefined) {
            //   console.log("file citation", annotations[0].file_citation);
          }
          let fileNames = [];
          for (const annotation of annotations) {
            if (annotation.file_citation !== undefined) {
              let fileName = await retrieveFileName(
                annotation.file_citation.file_id
              );
              fileNames.push(fileName);
            }
          }

          // Append message to the messages array
          messages.push({
            message: message.content[0].text.value,
            is_user_message: message.role === "user",
            annotations: annotations,
            file_names: fileNames,
          });
        }
      }
      // Reverse the order of messages
      messages.reverse();

      // Update the selectedChatMessages store
      selectedChatMessages.set(messages);
    } catch (e) {
      console.error("Error fetching chat messages:", e);
      // Handle error as needed
    }
  }

  // Function to load AI response for a chat
  async function sendUserMessageAndAIResponse() {
    if (loading) return; // Prevent sending the message if a previous message is still being sent
    loading = true;
    const userId = await getCurrentUserId();
    await getAIResponse(userId);
    loading = false;
    question = "";
  }

  async function getAssistantID(userID) {
    const { data: userData, error: userError } = await supabaseClient
      .from("user_data")
      .select("assistant_id")
      .eq("user_id", userID)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
    } else {
      if (userData) {
        const assistantId = userData.assistant_id;
        console.log("Assistant ID:", assistantId);
        return assistantId;
      } else {
        console.log("User not found");
      }
    }
  }

  async function getAIResponse(userId) {
    try {
      let client = new OpenAI({
        apiKey: PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      // Send user message to the OpenAI thread
      let userMessage = await client.beta.threads.messages.create(
        selectedThreadId,
        {
          role: "user",
          content: question,
        }
      );
      console.log("user message", userMessage);

      // Get Assistant ID
      let assistantId = await getAssistantID(userId);

      // Run the OpenAI thread

      let run = await client.beta.threads.runs.create(
        selectedThreadId, // threadId
        {
          assistant_id: assistantId,
          instructions:
            "Please address the user as Jane Doe. The user has a premium account.",
        }
        // {
        //   maxTokens: 10,
        // }
      );

      // Check the status of the run instead of using a fixed timeout
      while (
        run.status === "in_progress" ||
        run.status === "queued" ||
        run.status === "cancelling"
      ) {
        // Wait for a short interval before checking again
        await new Promise((resolve) => setTimeout(resolve, 1000));
        run = await client.beta.threads.runs.retrieve(selectedThreadId, run.id);
        console.log("new run status", run.status);
      }

      if (run.status === "completed") {
        await loadChatMessages(selectedThreadId);
        return;
      } else {
        errorText = "Run failed";
        console.error("Run failed:");
      }
    } catch (e) {
      console.error("Error getting AI response:", e);
      // Handle error as needed
    }
  }

  async function getCurrentUserId() {
    const user = await supabaseClient.auth.getUser();
    return user ? user.data.user.id : null; // Return the user ID or null if the user is not authenticated
  }

  async function selectChat(chatId) {
    selectedThreadId = chatId;
    await loadChatMessages(selectedThreadId);
  }

  async function deleteChat(chatId) {
    if (loading) {
      console.log("It's loading");
      return;
    } // Prevent deleting the chat if a previous deletion is still in progress
    // Check if the deleted chat is the current chat
    const isCurrentChat = selectedThreadId === chatId;

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
        selectedThreadId = mostRecentChatId;
      }
    }
  }

  async function retrieveFileName(fileId) {
    try {
      // Use the OpenAI API client to retrieve file details
      const fileDetails = await client.files.retrieve(fileId);
      console.log("file details", fileDetails);
      // Extract the file name from the file details
      const fileName = fileDetails.filename;
      return fileName;
    } catch (error) {
      console.error("Error retrieving file details:", error);
      // Handle error as needed
      return "Error retrieving file";
    }
  }

  onMount(async () => {
    // Fetch and load user chats on component mount
    client = new OpenAI({
      apiKey: PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    await loadUserChats();
    await createNewChat();
  });

  let isChatHistorySidebarOpen = false;

  // Function to toggle the combined sidebar visibility
  function toggleSidebar() {
    isChatHistorySidebarOpen = !isChatHistorySidebarOpen;
  }
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
              <!-- <div class="mb-4">
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
              </div> -->
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
                on:click={async () =>
                  await selectChat(chat.chat_id.slice(0, 36))}
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
          {#if selectedThreadId === null}
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
                {#if message.annotations !== undefined}
                  <div class="file-citations">
                    {#each message.annotations as annotation}
                      <!-- {#if annotation.file_citation} -->
                      <p class="file-citation">
                        <span class="annotation-index">{annotation.text}</span>
                        Lines {annotation.start_index} to {annotation.end_index}
                        "{annotation.file_citation.quote.substring(0, 50)}..."
                        from {message.file_names[
                          message.annotations.indexOf(annotation)
                        ]}
                      </p>
                      <!-- {/if} -->
                    {/each}
                  </div>
                {/if}
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
              disabled={selectedThreadId === null || loading}
            />
          </div>

          <!-- Combined button to send user message and get AI response -->
          <button
            class="btn btn-primary mb-4"
            on:click={() => sendUserMessageAndAIResponse()}
            disabled={selectedThreadId === null}
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
  .file-citations {
    /* color: blue; Change the color to your preference */
    margin-top: 8px;
    font-size: small;
  }

  .annotation-index {
    font-weight: bold;
  }
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
