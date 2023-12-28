<script lang="ts">
  // Import necessary functions from your existing script
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";
  import { onMount, onDestroy } from "svelte";
  import { createClient } from "@supabase/supabase-js";
  import { writable } from "svelte/store";
  import {
    PUBLIC_SUPABASE_KEY,
    PUBLIC_SUPABASE_URL,
    PUBLIC_OPENAI_API_KEY,
  } from "$env/static/public";
  import { OpenAI } from "openai";
  import hljs from "highlight.js";
  import "highlight.js/styles/panda-syntax-dark.css"; // choose a style that fits your app
  import katex from "katex";
  import "katex/dist/katex.min.css";
  import { marked } from "marked";

  const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  let vector;
  let embeddings;
  let model = "tiiuae/falcon-7b-instruct";
  let temperature = 0.2;
  let question = "";
  let loading = false;
  let errorText = null;
  let client;
  let instructions = "";
  let copyButtonText = "Copy Code";
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  const highlightedChatIDs = writable([]);
  // Store to hold list of user chats
  const userChats = writable([]);
  // Store to hold selected chat messages
  const selectedChatMessages = writable([]);
  // Store to hold the currently selected chat ID
  let selectedThreadId = null;

  async function createNewChat() {
    // Check if the first chat in the list is not an empty chat
    if ($userChats.length === 0) {
      let thread = await client.beta.threads.create();
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
      userChats.update((chats) => [{ chat_id: thread.id }, ...chats]); // Use unshift to add the new chat to the beginning
      selectedThreadId = thread.id;
      $highlightedChatIDs = [thread.id];
      selectedChatMessages.set([]);
      return;
    } else {
      const isFirstChatNotEmpty =
        $userChats[0].firstUserMessage !== "" &&
        $userChats[0].firstUserMessage !== null &&
        $userChats[0].firstUserMessage !== undefined;
      if (isFirstChatNotEmpty) {
        let thread = await client.beta.threads.create();
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
        userChats.update((chats) => [{ chat_id: thread.id }, ...chats]); // Use unshift to add the new chat to the beginning
        selectedThreadId = thread.id;
        $highlightedChatIDs = [thread.id];
        selectedChatMessages.set([]);
      } else {
        selectedThreadId = $userChats[0].chat_id;
        $highlightedChatIDs = [$userChats[0].chat_id];
        selectedChatMessages.set([]);
      }
    }
  }

  async function getFirstUserMessage(threadID) {
    try {
      // Get messages from the OpenAI thread
      let response = await client.beta.threads.messages.list(threadID);
      // console.log("response", response);
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
      .from("chats") // Specify the type of the data
      .select("chat_id") // Specify the columns as separate arguments
      .eq("user_id", userId)
      .order("timestamp", { ascending: false }); // Order the results by timestamp in descending order

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
      // console.log("response", response);

      // Display AI response messages on the screen
      let messages = [];
      for (const message of response.data) {
        if (
          message.content &&
          message.content.length > 0 &&
          message.content[0].type === "text"
        ) {
          let annotations = message.content[0].text.annotations;
          // console.log("annotations", annotations);
          // if (annotations !== undefined) {
          //   //   console.log("file citation", annotations[0].file_citation);
          // }
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
      await loadChatMessages(selectedThreadId);
      scrollToBottom();
      // Get Assistant ID
      let assistantId = await getAssistantID(userId);

      // Run the OpenAI thread

      let run = await client.beta.threads.runs.create(
        selectedThreadId, // threadId
        {
          assistant_id: assistantId,
          instructions: instructions,
          // instructions:
          //   "Please address the user as Jane Doe. The user has a premium account.",
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
        scrollToBottom();
        if ($selectedChatMessages.length === 2) {
          loadUserChats();
        }
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

  // async function setInstructions() {
  //   client.beta.threads.update(selectedThreadId, {
  //     instructions: instructions,
  //   });
  // }

  // async function getInstructions() {
  //   let thread = await client.beta.threads.retrieve(selectedThreadId);
  //   console.log("thread", thread);
  //   return thread.instructions;
  // }

  async function getCurrentUserId() {
    const user = await supabaseClient.auth.getUser();
    return user ? user.data.user.id : null; // Return the user ID or null if the user is not authenticated
  }

  async function selectChat(chatId) {
    selectedThreadId = chatId;
    $highlightedChatIDs = [chatId];
    await loadChatMessages(selectedThreadId);
    scrollToBottom();
  }

  async function deleteChat(chatId) {
    if (loading) {
      console.log("It's loading");
      return;
    } // Prevent deleting the chat if a previous deletion is still in progress
    // loading = true;
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
      await loadUserChats();
      // Check if there are no remaining chats after deleting the current chat
      if ($userChats.length === 0) {
        // If there is only one chat remaining, create a new chat
        await createNewChat();
      } else {
        // Fetch and load user chats again to update the chat list with the most recent chat ID
        // Set the selectedThreadId to the most recent chat ID only if the deleted chat was the current chat
        if (isCurrentChat) {
          await selectChat($userChats[0].chat_id);
        }
      }
    }
  }

  async function retrieveFileName(fileId) {
    try {
      // Use the OpenAI API client to retrieve file details
      const fileDetails = await client.files.retrieve(fileId);
      // console.log("file details", fileDetails);
      // Extract the file name from the file details
      const fileName = fileDetails.filename;
      return fileName;
    } catch (error) {
      console.error("Error retrieving file details:", error);
      // Handle error as needed
      return "Deleted file";
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

    // instructions = await getInstructions();
  });

  onMount(() => {
    const updateScreenWidth = () => {
      screenWidth = window.innerWidth;
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };

    const updateScreenHeight = () => {
      screenHeight = window.innerHeight;
    };

    window.addEventListener("resize", updateScreenHeight);

    return () => {
      window.removeEventListener("resize", updateScreenHeight);
    };
  });
  let isChatHistorySidebarOpen = false;

  // Function to toggle the combined sidebar visibility
  function toggleSidebar() {
    isChatHistorySidebarOpen = !isChatHistorySidebarOpen;
  }

  // let messages = [
  //   "This is some **bold** text.",
  //   "```javascript\nconsole.log('Hello, world!');\n```",
  //   "This is another paragraph. ```python\nprint('Hello from Python!')\n```",
  //   "Hi ",
  // ];

  function replaceMathDelimiters(inputString) {
    // Use regular expression to replace all occurrences of \[ and \] with $$ and \( and \) with $$
    let replacedString = inputString.replace(/\\\[|\\\]/g, "$$$$");
    replacedString = replacedString.replace(/\\\(|\\\)/g, "$$$$");
    return replacedString;
  }

  function formatMessage(message) {
    let formattedMessage = [];
    let codeLanguage = "";
    message.split("```").forEach((segment, index) => {
      if (index % 2 === 0) {
        message = replaceMathDelimiters(message);
        message.split("$$").forEach((segment, index) => {
          if (index % 2 === 0) {
            formattedMessage.push({
              type: "markdown",
              content: marked(segment),
            });
          } else {
            const latex = katex.renderToString(segment, {
              throwOnError: false,
            });
            formattedMessage.push({ type: "latex", content: latex });
          }
        });
      } else {
        codeLanguage = segment.trim().split("\n")[0];
        const codeWithoutFirstLine = segment.split("\n").slice(1).join("\n");
        const highlightedCode = hljs.highlightAuto(codeWithoutFirstLine, [
          codeLanguage,
        ]);
        formattedMessage.push({
          type: "code",
          content: highlightedCode.value,
          language: codeLanguage,
          originalCode: codeWithoutFirstLine,
        });
      }
    });

    return formattedMessage;
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showMessageCopied();
  }
  function showMessageCopied() {
    // const copyButton = document.querySelector(`#copy-button`);
    copyButtonText = "Copied!";
    setTimeout(() => {
      copyButtonText = "Copy Code";
    }, 1000);
  }
  $: scrollToBottom();
  function scrollToBottom() {
    const chatContainer = document.getElementById("messages-section");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  function handleTextareaKeyDown(event: KeyboardEvent) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter" && !event.shiftKey) {
      // Prevent the default behavior (e.g., adding a new line)
      event.preventDefault();
      // Call the sendUserMessageAndAIResponse function
      sendUserMessageAndAIResponse();
    }
  }

  function handleTextareaInput() {
    const textarea = document.getElementById("question") as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      5 * parseFloat(getComputedStyle(textarea).lineHeight)
    )}px`;
  }
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>
<AuthCheck>
  <div
    class=" bg-gray-900 text-white h-full w-full flex"
    style=" postion: relative;  overflow: hidden;"
  >
    <!-- Combined Sidebar - Chat History and Configuration -->
    <div
      class={`absolute left-0 top-0 bg-black rounded-lg p-4 sidebar ${
        isChatHistorySidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <div class="overflow-y-auto">
        <div class="w-full md:w-3/4 mt-14">
          <div class="mb-4">
            <label class="block text-lg font-semibold" for="temperature">
              Temperature
            </label>
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
        <button class="btn btn-primary btn-sm mb-5" on:click={createNewChat}>
          <i class="fas fa-plus" /> New Chat
        </button>
        {#if $userChats.length > 0}
          <!-- <div class="overflow-y-auto h-96"> -->
          {#each $userChats as chat}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div
              class="flex items-center justify-between mb-2 chat-box"
              style="{$highlightedChatIDs.includes(chat.chat_id)
                ? 'background-color: #f2f2f242'
                : ''} "
              on:click={async () => await selectChat(chat.chat_id)}
              on:mouseover={() => {
                if (
                  $highlightedChatIDs.length < 2 &&
                  !$highlightedChatIDs.includes(chat.chat_id)
                )
                  $highlightedChatIDs = [...$highlightedChatIDs, chat.chat_id];
              }}
              on:mouseout={() => {
                if (chat.chat_id !== selectedThreadId) {
                  $highlightedChatIDs = $highlightedChatIDs.filter(
                    (id) => id !== chat.chat_id
                  );
                }
              }}
            >
              {#if chat.firstUserMessage !== "" && chat.firstUserMessage !== null && chat.firstUserMessage !== undefined}
                <span class="chat-title">
                  {chat.firstUserMessage}
                </span>
              {:else}
                <span class="chat-title">New Chat</span>
              {/if}
              <!-- Add a button to delete the chat -->
              <button
                class="delete-button"
                on:click={() => deleteChat(chat.chat_id)}
                on:mouseover={() => {
                  if (
                    $highlightedChatIDs.length < 2 &&
                    !$highlightedChatIDs.includes(chat.chat_id)
                  )
                    $highlightedChatIDs = [
                      ...$highlightedChatIDs,
                      chat.chat_id,
                    ];
                }}
                on:mouseout={() => {
                  if (chat.chat_id !== selectedThreadId) {
                    $highlightedChatIDs = $highlightedChatIDs.filter(
                      (id) => id !== chat.chat_id
                    );
                  }
                }}
                style="visibility: {$highlightedChatIDs.includes(chat.chat_id)
                  ? 'visible'
                  : 'hidden'}"
              >
                <i class="fas fa-trash-alt" style="color: white" />
              </button>
            </div>
          {/each}
        {:else}
          <!-- Loading indicator when there are no chats -->
          <div class="text-left text-gray-500 mt-5 ml-2">
            <i class="fas fa-spinner fa-spin mr-3"></i> Loading Chats...
          </div>
        {/if}
      </div>
    </div>

    <div
      class={`w-full main-content ${
        isChatHistorySidebarOpen ? "main-content-shifted" : ""
      }`}
    >
      {#if isChatHistorySidebarOpen && screenWidth >= 300 && screenWidth <= 768}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="overlay" on:click={toggleSidebar}></div>
      {/if}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="sidebar-toggle-btn" on:click={toggleSidebar}>
        {#if isChatHistorySidebarOpen}
          <i class="chevron fas fa-chevron-left text-2xl" />
        {:else}
          <i class="chevron fas fa-chevron-right text-2xl" />
        {/if}
      </div>

      <NavBar />

      <!-- Middle Section - Chat Messages -->
      <div
        class={`items-center w-full h-full chat-container  ${
          isChatHistorySidebarOpen ? "main-content-shifted" : ""
        }`}
      >
        <div class="mb-8">
          <!-- <h2 class="text-2xl font-semibold mt-4">
              Custom Instructions (overrides everything else):
            </h2> -->
          <h2 class="text-l sm:text-xl font-semibold mt-4">
            Custom Instructions (overrides everything else)
          </h2>

          <textarea
            rows="1"
            bind:value={instructions}
            id="instructions"
            class="textarea textarea-accent resize-none w-full mt-2 mb-5"
            placeholder="Enter personalized instructions... (overriding all other instructions)"
          ></textarea>
          <!-- <button
              class="btn btn-primary mb-4"
              on:click={() => setInstructions()}
              disabled={selectedThreadId === null}
            >
              Set Instructions for this thread
            </button> -->

          <!-- <h1 class="text-4xl font-bold mb-8">Chat Messages</h1> -->
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold mb-8">
            Chat Messages
          </h1>
          {#if selectedThreadId === null || selectedThreadId === undefined}
            <div style="overflow-y: auto; height:{screenHeight * 0.58}px">
              <p class="text-gray-500 h-[80%]">
                Select a chat from the history to view messages.
              </p>
            </div>
          {:else}
            <div
              id="messages-section"
              style="overflow-y: auto; height:{screenHeight * 0.58}px"
            >
              {#each $selectedChatMessages as message, index (index)}
                <div
                  class="chat-message"
                  class:is-user-message={message.is_user_message}
                >
                  {#if message.is_user_message}
                    <pre>{message.message}</pre>
                  {:else}
                    {#each formatMessage(message.message) as { type, content, language, originalCode }, i (i)}
                      {#if type === "markdown"}
                        {@html content}
                      {/if}
                      {#if type === "latex"}
                        {@html content}
                      {/if}
                      {#if type === "code"}
                        <div class="code-block-container">
                          <div class="code-block-banner">
                            {language}
                            <button
                              class="copy-button"
                              on:click={() => copyToClipboard(originalCode)}
                              >{copyButtonText}</button
                            >
                          </div>
                          <pre class="code-block">{@html content}</pre>
                        </div>
                      {/if}
                      {#if message.annotations !== undefined}
                        <div class="file-citations">
                          {#each message.annotations as annotation}
                            <!-- {#if annotation.file_citation} -->
                            <p class="file-citation">
                              <span class="annotation-index"
                                >{annotation.text}</span
                              >
                              Lines {annotation.start_index} to {annotation.end_index}
                              "{annotation.file_citation.quote.substring(
                                0,
                                50
                              )}..." from {message.file_names[
                                message.annotations.indexOf(annotation)
                              ]}
                            </p>
                            <!-- {/if} -->
                          {/each}
                        </div>
                      {/if}
                    {/each}
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Ask AI Box Section -->
        <div
          class="mt-4 mr-30 ml-30"
          style="position: relative; width: 100%; height: 100px"
        >
          <div class="flex items-bottom">
            <div class="flex-1 form-control" style="position: relative;">
              <textarea
                bind:value={question}
                id="question"
                rows="1"
                class="textarea textarea-primary resizeable-textarea"
                placeholder="Ask James anything..."
                disabled={selectedThreadId === null || loading}
                on:input={handleTextareaInput}
                on:keydown={handleTextareaKeyDown}
              />
            </div>
            <!-- Combined button to send user message and get AI response -->
            <button
              class="btn btn-primary ml-2"
              on:click={() => sendUserMessageAndAIResponse()}
              disabled={selectedThreadId === null || loading || question === ""}
            >
              Ask James
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
    </div>
  </div>
</AuthCheck>

<style>
  .resizeable-textarea {
    position: absolute;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: 1em; /* Initial height as one line */
    overflow-y: auto; /* Enable vertical scrolling if content exceeds height */
    resize: none; /* Disable manual resizing */
  }
  .chat-box {
    position: relative;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 35px;
    padding-top: 2px;
    padding-bottom: 2px;
    align-items: left;
  }
  /* .chat-box:hover {
    background-color: #f2f2f242;
  } */
  .chat-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .delete-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
    cursor: pointer;
    transition: visibility 0.3s;
  }

  /* .messages-container {
    height: 300px;
    overflow-y: auto;
  } */

  .chat-container {
    /* Your existing styles for the chat container */

    &.main-content-shifted {
      /* Apply this style when .main-content-shifted is present */
      width: 85%;
      margin: 0 auto; /* Center the content horizontally */
    }

    &:not(.main-content-shifted) {
      /* Apply this style when .main-content-shifted is not present */
      width: 70%;
      margin: 0 auto; /* Center the content horizontally */
    }

    @media screen and (max-width: 800px) {
      /* Additional styles for screens smaller than 800px */
      &.main-content-shifted {
        width: 100%;
      }

      &:not(.main-content-shifted) {
        width: 100%;
      }
    }

    @media screen and (min-width: 800px) and (max-width: 1100px) {
      /* Additional styles for screens between 800px and 1100px */
      &:not(.main-content-shifted) {
        width: 90%;
      }
    }
  }
  .file-citations {
    /* color: blue; Change the color to your preference */
    margin-top: 8px;
    font-size: small;
  }
  .code-block {
    background-color: black;
    padding: 10px;
    border-radius: 0px 0px 8px 8px;
    overflow-x: auto;
    word-wrap: break-word; /* Add this line to prevent overflow of long words */
  }
  .code-block-container {
    overflow-x: auto;
    margin-top: 10px;
  }

  .code-block-banner {
    background-color: #5616c6;
    padding: 5px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copy-button {
    padding-right: 5px;
    cursor: pointer;
  }
  .annotation-index {
    font-weight: bold;
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
    z-index: 5;
  }

  .sidebar-toggle-btn .chevron {
    color: #1f2937;
  }

  /* .chat-container {
    height: 300px; /* Set a fixed height for chat messages display area */
  /* overflow-y: auto; /* Enable vertical scrolling if the messages overflow */ /*
  } */

  .chat-message {
    white-space: pre-line;
    margin-bottom: 8px;
  }

  .chat-message.is-user-message {
    color: #ffcc00; /* Customize the user message color */
  }

  /* Responsive layout using media queries */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    /* background-color: #2d3748; */
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
    z-index: 3;
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-toggle-btn {
    position: fixed;
    top: 1.5rem;
    left: 2rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 5;
  }

  .sidebar-toggle-btn .chevron {
    color: #1f2937;
  }

  @media screen and (max-width: 768px) {
    .sidebar {
      width: 100%; /* Set to 100% on very small screens */
      max-width: 300px; /* Set your preferred fixed width, but not exceeding 100% */
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 3;
    }

    .sidebar-open {
      transform: translateX(0);
    }

    .main-content {
      transition: margin-left 0.3s ease-in-out;
    }

    .main-content.main-content-shifted {
      margin-left: 0; /* Set to 0 when the sidebar is open on screens smaller than 800px */
    }

    .chat-container.main-content-shifted {
      margin-left: 0; /* Set to 0 when the sidebar is open on screens smaller than 800px */
    }

    /* Overlay to dismiss the sidebar */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
      display: block;
    }
  }

  @media screen and (min-width: 769px) {
    /* Adjust styles for screens larger than 768px (800px in this case) */
    .main-content.main-content-shifted {
      margin-left: 300px; /* Set to 300px when the sidebar is open on screens larger than 800px */
    }
  }
  /* Additional global styles go here */
</style>
