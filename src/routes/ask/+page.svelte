<script lang="ts">
  // Import necessary functions from your existing script
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import hljs from "highlight.js";
  import "highlight.js/styles/panda-syntax-dark.css"; // choose a style that fits your app
  import katex from "katex";
  import "katex/dist/katex.min.css";
  import { marked } from "marked";
  import { supabaseClient } from "$lib/supabase.js";
  import { getDocuments } from "$lib/brain";
  import Upload from "$lib/Upload.svelte";
  import type { formatPostcssSourceMap } from "vite";
  import LogoHuggingFaceBorderless from "$lib/components/icons/LogoHuggingFaceBorderless.svelte";
  import { load } from "cheerio";
  let temperature = 0.2;
  let questionTextArea = "";
  let questionSent = "";
  let loading = false;
  let errorText = null;
  let instructions = "";
  let copyButtonText = "Copy Code";
  let assistantId = "";
  let userId = "";
  let addedFileIds = [];
  let addedFileNames = [];
  let allFiles = [];
  let savedPrompts = [];
  let isProcessing = false;
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let errorMessage = "";
  let successMessage = "";
  let statusMessage = "";
  let currentRun;
  let retrievalEnabled = false;
  let codeInterpreterEnabledDatabase = false;
  let codeInterpreterToggle = false;

  const highlightedChatIDs = writable([]);
  // Store to hold list of user chats
  const userChats = writable([]);
  const userChatsRemaining = writable([]);
  // Store to hold selected chat messages
  const selectedChatMessages = writable([]);
  // Store to hold the currently selected chat ID
  let selectedThreadId = null;

  async function createNewChat() {
    // Check if the first chat in the list is not an empty chat
    if ($userChats.length === 0) {
      // let thread = await client.beta.threads.create();
      let thread = await createThread();
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
      addedFileIds = [];
      addedFileNames = [];
      return;
    } else {
      const isFirstChatNotEmpty =
        $userChats[0].firstUserMessage !== "" &&
        $userChats[0].firstUserMessage !== null &&
        $userChats[0].firstUserMessage !== undefined;
      if (isFirstChatNotEmpty) {
        // let thread = await client.beta.threads.create();
        let thread = await createThread();
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
        codeInterpreterEnabledDatabase = false;
        codeInterpreterToggle = false;
        addedFileIds = [];
        addedFileNames = [];
      } else {
        selectedThreadId = $userChats[0].chat_id;
        $highlightedChatIDs = [$userChats[0].chat_id];
        selectedChatMessages.set([]);
        codeInterpreterEnabledDatabase =
          await getCodeInterpreterStatus(selectedThreadId);
        codeInterpreterToggle = codeInterpreterEnabledDatabase;
        await getFilesForAssistant(selectedThreadId);
        instructions = await getCurrentInstructions(selectedThreadId);
      }
    }
  }

  async function createThread() {
    let jsonThread = await fetch("/api/ask/createThread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let thread = await jsonThread.json();
    return thread;
  }

  async function getFirstUserMessage(threadID) {
    const jsonResponse = await fetch("/api/ask/getFirstMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadID: threadID,
      }),
    });

    const response = await jsonResponse.json();
    try {
      if (response.data.length > 0) {
        return response.data[0].content[0].text.value;
      }
    } catch (e) {
      return "New Chat";
    }
  }

  // Function to load user chats with the first user message
  // async function loadUserChats() {
  //   const userId = await getCurrentUserId();

  //   // Fetch user chats from Supabase based on the user ID
  //   const { data: chats, error } = await supabaseClient
  //     .from("chats") // Specify the type of the data
  //     .select("chat_id") // Specify the columns as separate arguments
  //     .eq("user_id", userId)
  //     .order("timestamp", { ascending: false }); // Order the results by timestamp in descending order

  //   if (error) {
  //     console.error("Error fetching user chats:", error.message);
  //     errorText = error.message;
  //   } else {
  //     // Create a Set to keep track of unique chat IDs
  //     const uniqueChatIds = new Set();

  //     // Create an array to store the processed user chats
  //     const processedChats = [];

  //     // Loop through each chat and add it to the processedChats array only if it's unique
  //     for (const chat of chats) {
  //       if (!uniqueChatIds.has(chat.chat_id)) {
  //         uniqueChatIds.add(chat.chat_id);

  //         // const firstUserMessage = "Chat";
  //         const firstUserMessage = await getFirstUserMessage(chat.chat_id);

  //         // Add the chat with the first user message to the processedChats array
  //         processedChats.push({ ...chat, firstUserMessage });
  //       }
  //     }
  //     // Update the userChats store with the processed chats
  //     userChats.set(processedChats);
  //   }
  // }
  async function loadUserChats() {
    const userId = await getCurrentUserId();

    const { data: chats, error } = await supabaseClient
      .from("chats")
      .select("chat_id")
      .eq("user_id", userId)
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching user chats:", error.message);
      errorText = error.message;
    } else {
      const uniqueChatIds = new Set();
      const processedChats = [];
      let remainingChats = [];

      for (const chat of chats) {
        if (!uniqueChatIds.has(chat.chat_id)) {
          uniqueChatIds.add(chat.chat_id);

          const firstUserMessage =
            processedChats.length < 10
              ? await getFirstUserMessage(chat.chat_id)
              : null;

          if (processedChats.length < 10) {
            processedChats.push({ ...chat, firstUserMessage });
          } else {
            remainingChats.push({ ...chat, firstUserMessage });
          }
        }
      }

      userChats.set(processedChats);
      userChatsRemaining.set(remainingChats);
    }
  }

  function loadMoreChats() {
    const nextChats = $userChatsRemaining.slice(0, 20);

    Promise.all(
      nextChats.map((chat) => getFirstUserMessage(chat.chat_id))
    ).then((firstMessages) => {
      const nextChatsWithMessages = nextChats.map((chat, index) => ({
        ...chat,
        firstUserMessage: firstMessages[index],
      }));

      userChats.update((chats) => [...chats, ...nextChatsWithMessages]);
      userChatsRemaining.update((chats) => chats.slice(20));
    });
  }

  async function getMessagesFromThread(threadID) {
    let jsonResponse = await fetch("/api/ask/getMessagesFromThread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadID: threadID,
      }),
    });
    let response = await jsonResponse.json();
    return response;
  }
  async function loadChatMessages(threadID) {
    try {
      // let response = await client.beta.threads.messages.list(threadID);
      let response = await getMessagesFromThread(threadID);
      let messages = [];
      for (const message of response.data) {
        if (
          message.content &&
          message.content.length > 0 &&
          message.content[0].type === "text"
        ) {
          let annotations = message.content[0].text.annotations;
          // console.log("annotations", annotations);
          // if (annotations !== undefined)  {
          //   console.log("file citation", annotations[0].file_citation);
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
    questionSent = questionTextArea;
    questionTextArea = "";
    const textarea = document.getElementById("question");
    textarea.style.height = "auto";
    await getAIResponse(userId);
    loading = false;
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

  async function stopRun() {
    if (currentRun === undefined || loading === false) {
      return;
    }
    try {
      if (
        currentRun.status === "in_progress" ||
        currentRun.status === "queued"
      ) {
        let jsonRun = await fetch("/api/ask/cancelRun", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedThreadId: selectedThreadId,
            runID: currentRun.id,
          }),
        });
      }
    } catch (e) {}
    loading = false;
  }

  async function getAIResponse(userId) {
    try {
      let threadBeingRun = selectedThreadId;
      let sendMessage = await fetch("/api/ask/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedThreadId: threadBeingRun,
          question: questionSent,
        }),
      });

      await loadChatMessages(threadBeingRun);
      scrollToBottom();

      let jsonRun = await fetch("/api/ask/runThread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedThreadId: threadBeingRun,
          assistantId: assistantId,
          instructions: instructions,
          enableRetrieval: retrievalEnabled,
          enableCodeInterpreter: codeInterpreterToggle,
        }),
      });
      currentRun = await jsonRun.json();
      if (codeInterpreterToggle === true) {
        codeInterpreterEnabledDatabase =
          await setCodeInterpreterTrue(threadBeingRun);
      }

      // Check the status of the run instead of using a fixed timeout
      while (
        (currentRun.status === "in_progress" ||
          currentRun.status === "queued" ||
          currentRun.status === "cancelling") &&
        loading === true
      ) {
        // Wait for a short interval before checking again
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // run = await client.beta.threads.runs.retrieve(selectedThreadId, run.id);
        jsonRun = await fetch("/api/ask/retrieveRun", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedThreadId: threadBeingRun,
            runID: currentRun.id,
          }),
        });
        currentRun = await jsonRun.json();
        console.log("new run status", currentRun.status);
      }

      if (currentRun.status === "completed") {
        if (selectedThreadId !== threadBeingRun) {
          return;
        }
        await loadChatMessages(selectedThreadId);
        scrollToBottom();
        if ($selectedChatMessages.length === 2) {
          loadUserChats();
        }
        return;
      } else {
        if (loading === true) {
          errorText = "Run failed";
          console.error("Run failed:");
        }
        return;
      }
    } catch (e) {
      console.error("Error getting AI response:", e);
      return;
    }
  }

  async function getCurrentUserId() {
    const user = await supabaseClient.auth.getUser();
    return user ? user.data.user.id : null; // Return the user ID or null if the user is not authenticated
  }

  async function selectChat(chatId) {
    instructions = "";
    selectedThreadId = chatId;
    $highlightedChatIDs = [chatId];
    await loadChatMessages(selectedThreadId);
    scrollToBottom();
    codeInterpreterEnabledDatabase = await getCodeInterpreterStatus(chatId);
    codeInterpreterToggle = codeInterpreterEnabledDatabase;

    await getFilesForAssistant(chatId);
    instructions = await getCurrentInstructions(chatId);
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
      // const fileDetails = await client.files.retrieve(fileId);
      let jsonfileDetails = await fetch("/api/ask/retrieveFileDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId: fileId,
        }),
      });
      let fileDetails = await jsonfileDetails.json();
      const fileName = fileDetails.filename;
      return fileName;
    } catch (error) {
      console.error("Error retrieving file details:", error);
      // Handle error as needed
      return "Deleted file";
    }
  }

  async function getFileNames(fileIds) {
    let fileNames = [];
    for (const fileId of fileIds) {
      let fileName = await retrieveFileName(fileId);
      fileNames.push(fileName);
    }
    return fileNames;
  }

  async function getFilesForAssistant(chatId) {
    try {
      addedFileIds = [];
      addedFileNames = [];
      let existingFileIds = await getFileIdsForChat(userId, chatId);

      for (const fileId of existingFileIds) {
        if (!addedFileIds.includes(fileId)) {
          addedFileIds.push(fileId);
        }
      }
      if (addedFileIds.length === 0) {
        retrievalEnabled = false;
      } else {
        retrievalEnabled = true;
      }
      const addFilesResponse = await fetch("/api/ask/updateAssistantFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: assistantId, // Replace with your actual assistant ID
          files: addedFileIds,
          enableCodeInterpreter: codeInterpreterToggle,
          enableRetrieval: retrievalEnabled,
        }),
      });
      const addedFiles = await addFilesResponse.json();
      // console.log("addedFiles", addedFiles);
      addedFileIds = addedFiles.data.map((file) => file.id);
      addedFileNames = await getFileNames(addedFileIds);
    } catch (e) {
      addedFileIds = [];
      addedFileNames = [];
      console.log(e);
    }
  }
  async function getCurrentInstructions(chatId) {
    try {
      // Get the current chat record
      const { data: currentChat } = await supabaseClient
        .from("chats")
        .select("current_instruction")
        .eq("user_id", userId)
        .eq("chat_id", chatId)
        .single();
      const instructions = currentChat
        ? currentChat.current_instruction || null
        : "";
      return instructions;
    } catch (error) {
      console.error(`Error getting instructions for chat: ${error.message}`);
      return "";
    }
  }

  async function getCodeInterpreterStatus(chatId) {
    try {
      // Get the current chat record
      const { data: currentChat } = await supabaseClient
        .from("chats")
        .select("code_interpreter_enabled")
        .eq("user_id", userId)
        .eq("chat_id", chatId)
        .single();
      const codeInterpreterEnbled = currentChat
        ? currentChat.code_interpreter_enabled || false
        : false;
      return codeInterpreterEnbled;
    } catch (error) {
      console.error(`Error getting instructions for chat: ${error.message}`);
      return "";
    }
  }
  onMount(async () => {
    // Fetch and load user chats on component mount
    try {
      userId = await getCurrentUserId();
      assistantId = await getAssistantID(userId);
      await loadUserChats();
      await createNewChat();
      // const addedFiles = await client.beta.assistants.files.list(assistantId);
      codeInterpreterEnabledDatabase =
        await getCodeInterpreterStatus(selectedThreadId);
      codeInterpreterToggle = codeInterpreterEnabledDatabase;
      await getFilesForAssistant(selectedThreadId);
      instructions = await getCurrentInstructions(selectedThreadId);
      savedPrompts = await getSavedPrompts(selectedThreadId);
      document
        .getElementById("popupContainer")
        .addEventListener("click", function (event) {
          event.stopPropagation(); // Prevent the click event from propagating to the overlay
        });

      document
        .getElementById("popupOverlay")
        .addEventListener("click", function () {
          closePopup();
        });
    } catch (e) {
      console.log(e);
    }

    // instructions = await getInstructions();
  });

  onMount(() => {
    const updateScreenWidth = () => {
      screenWidth = window.innerWidth;
    };

    window.addEventListener("resize", updateScreenWidth);

    const updateScreenHeight = () => {
      screenHeight = window.innerHeight;
    };

    window.addEventListener("resize", updateScreenHeight);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
      window.removeEventListener("resize", updateScreenHeight);
    };
  });
  let isChatHistorySidebarOpen = false;

  // Function to toggle the combined sidebar visibility
  function toggleSidebar() {
    isChatHistorySidebarOpen = !isChatHistorySidebarOpen;
  }

  function replaceMathDelimiters(inputString) {
    // Use regular expression to replace all occurrences of \[ and \] with $$ and \( and \) with $$
    let replacedString = inputString.replace(/\\\[|\\\]/g, "$$$$");
    replacedString = replacedString.replace(/\\\(|\\\)/g, "$$$$");
    return replacedString;
  }

  function formatMessage(message) {
    let formattedMessage = [];
    let codeLanguage = "";
    message = message.message;
    message.split("```").forEach((segment, index) => {
      if (index % 2 === 0) {
        message = replaceMathDelimiters(segment);
        let messageWithMaths = "";
        message.split("$$").forEach((segment, index) => {
          if (index % 2 === 0) {
            messageWithMaths += segment;
          } else {
            const latex = katex.renderToString(segment, {
              throwOnError: false,
            });
            messageWithMaths += latex;
          }
        });
        let messageWithMarkdown = marked(messageWithMaths);
        formattedMessage.push({
          type: "markdown",
          content: messageWithMarkdown,
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
    if (event.key === "Enter" && !event.shiftKey) {
      // Prevent the default behavior (e.g., adding a new line)
      event.preventDefault();
      sendUserMessageAndAIResponse();
    }
  }

  async function addFiles() {
    await updateUI();
    showPopup();
  }

  function closePopup() {
    const popupContainer = document.getElementById("popupOverlay");
    popupContainer.style.display = "none";
  }

  function showPopup() {
    const popupContainer = document.getElementById("popupOverlay");
    popupContainer.style.display = "flex";
  }
  async function setInstructions(chatId) {
    try {
      if (savedPrompts.includes(instructions)) {
        return;
      }
      const { data: updateData, error: updateError } = await supabaseClient
        .from("chats")
        .update({ current_instruction: instructions })
        .eq("chat_id", chatId);
      await addPromptToListOfSavedPrompts(chatId);
      savedPrompts = await getSavedPrompts(chatId);
      if (updateError) {
        console.error("Error updating user data:", updateError);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error adding file to chat: ${error.message}`);
      return false;
    }
  }

  async function getSavedPrompts(chatId) {
    try {
      // Get the current chat record
      const { data: currentChat } = await supabaseClient
        .from("user_data")
        .select("saved_prompts")
        .eq("user_id", userId)
        .single();
      const savedPrompts = currentChat ? currentChat.saved_prompts || [] : [];
      return savedPrompts;
    } catch (error) {
      console.error(`Error getting file ids for chat: ${error.message}`);
      return [];
    }
  }

  async function setCodeInterpreterTrue(chatId) {
    try {
      const { data: updateData, error: updateError } = await supabaseClient
        .from("chats")
        .update({ code_interpreter_enabled: true })
        .eq("chat_id", chatId);
      if (updateError) {
        console.error("Error:", updateError);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return false;
    }
  }

  async function addPromptToListOfSavedPrompts(chatId) {
    try {
      // Get the current chat record
      const existingPrompts = await getSavedPrompts(chatId);
      existingPrompts.push(instructions);
      const { data: updateData, error: updateError } = await supabaseClient
        .from("user_data")
        .update({ saved_prompts: existingPrompts })
        .eq("user_id", userId);
      if (updateError) {
        console.error("Error updating user data:", updateError);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  async function getCurrentFilesFromAssistant() {
    let currentFilesResponse = await fetch(
      "/api/ask/retrieveFilesFromAssistant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: assistantId, // Replace with your actual assistant ID
        }),
      }
    );
    let currentFiles = await currentFilesResponse.json();
    return currentFiles;
  }

  async function addFileToChat(userId, chatId, fileId) {
    try {
      // Get the current chat record
      const existingFileIds = await getFileIdsForChat(userId, chatId);
      existingFileIds.push(fileId);
      const { data: updateData, error: updateError } = await supabaseClient
        .from("chats")
        .update({ file_ids: existingFileIds })
        .eq("chat_id", chatId);
      if (updateError) {
        console.error("Error updating user data:", updateError);
      }
    } catch (error) {
      console.error(`Error adding file to chat: ${error.message}`);
    }
  }
  async function getFileIdsForChat(userId, chatId) {
    try {
      // Get the current chat record
      const { data: currentChat } = await supabaseClient
        .from("chats")
        .select("file_ids")
        .eq("user_id", userId)
        .eq("chat_id", chatId)
        .single();
      const existingFileIds = currentChat ? currentChat.file_ids || [] : [];
      return existingFileIds;
    } catch (error) {
      console.error(`Error getting file ids for chat: ${error.message}`);
      return [];
    }
  }
  async function removeFileFromChat(userId, chatId, fileId) {
    try {
      // Get the current chat record
      const existingFileIds = await getFileIdsForChat(userId, chatId);
      const updatedFileIds = existingFileIds.filter((id) => id !== fileId);
      const { data: updateData, error: updateError } = await supabaseClient
        .from("chats")
        .update({ file_ids: updatedFileIds })
        .eq("chat_id", chatId);
      if (updateError) {
        console.error("Error updating user data:", updateError);
      }
    } catch (error) {
      console.error(`Error removing file from chat: ${error.message}`);
    }
  }

  function checkFileExtensionForCodeInterpreter(filename) {
    const allowedExtensions = [
      ".csv",
      ".css",
      ".jpeg",
      ".jpg",
      ".js",
      ".gif",
      ".png",
      ".tar",
      ".ts",
      ".xlsx",
      ".xml",
      ".zip",
    ];
    const fileExtension = filename
      .slice(filename.lastIndexOf("."))
      .toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  function checkFileExtensionForRetrieval(filename) {
    const allowedExtensions = [
      ".c",
      ".cpp",
      ".docx",
      ".html",
      ".java",
      ".json",
      ".md",
      ".pdf",
      ".php",
      ".pptxt",
      ".py",
      ".rb",
      ".tex",
      ".txt",
    ];
    const fileExtension = filename
      .slice(filename.lastIndexOf("."))
      .toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  async function addFileToAssistant(fileId, filename) {
    if (isProcessing) return;
    try {
      isProcessing = true;
      retrievalEnabled = true;
      displayStatusMessage(`Adding "${filename}" to this chat...`);
      await addFileToChat(userId, selectedThreadId, fileId);
      //gets the current files
      let currentFiles = await getCurrentFilesFromAssistant();
      let file_ids = currentFiles.data.map((file) => file.id);
      file_ids.push(fileId);

      let requiresCodeInterpreter =
        checkFileExtensionForCodeInterpreter(filename);
      let requiresRetrieval = checkFileExtensionForRetrieval(filename);
      if (requiresCodeInterpreter) {
        codeInterpreterEnabledDatabase = true;
        codeInterpreterToggle = true;
        await setCodeInterpreterTrue(selectedThreadId);
      }
      if (requiresRetrieval) {
        retrievalEnabled = true;
      }
      // await client.beta.assistants.update(assistantId, {
      //   file_ids: file_ids,
      // });
      //const addedFiles = await client.beta.assistants.files.list(assistantId);

      //does the update and returns the new list of files
      const addFilesResponse = await fetch("/api/ask/updateAssistantFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: assistantId, // Replace with your actual assistant ID
          files: file_ids,
          enableCodeInterpreter: codeInterpreterToggle,
          enableRetrieval: retrievalEnabled,
        }),
      });
      const addedFiles = await addFilesResponse.json();
      // console.log("addedFiles", addedFiles);
      addedFileIds = addedFiles.data.map((file) => file.id);
      addedFileNames = await getFileNames(addedFileIds);

      displaySuccessMessage(`File "${filename}" added to this chat.`);
    } catch (error) {
      displayErrorMessage(
        `Error adding "${filename}" to this chat: ${error.message}`
      );
    } finally {
      isProcessing = false;
      await updateUI();
    }
  }

  async function removeFileFromAssistant(fileId, filename) {
    if (isProcessing) return;
    try {
      isProcessing = true;
      displayStatusMessage(`Removing "${filename}" from this chat...`);
      await removeFileFromChat(userId, selectedThreadId, fileId);
      // let currentFiles = await client.beta.assistants.files.list(assistantId);
      let currentFiles = await getCurrentFilesFromAssistant();
      let file_ids = currentFiles.data
        .map((file) => file.id)
        .filter((id) => id !== fileId);

      if (file_ids.length === 0) {
        retrievalEnabled = false;
      }
      // await client.beta.assistants.update(assistantId, {
      //   file_ids: file_ids,
      // });
      // const addedFiles = await client.beta.assistants.files.list(assistantId);

      //does the update and returns the new list of files
      const addFilesResponse = await fetch("/api/ask/updateAssistantFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: assistantId,
          files: file_ids,
          enableCodeInterpreter: codeInterpreterToggle,
          enableRetrieval: retrievalEnabled,
        }),
      });
      const addedFiles = await addFilesResponse.json();
      addedFileIds = addedFiles.data.map((file) => file.id);
      addedFileNames = await getFileNames(addedFileIds);

      displaySuccessMessage(
        `File "${filename}" has been removed from this chat.`
      );
    } catch (error) {
      displayErrorMessage(
        `Error removing "${filename}" from this chat: ${error.message}`
      );
    } finally {
      isProcessing = false;
      await updateUI();
    }
  }

  function displaySuccessMessage(message) {
    successMessage = message;
    errorMessage = "";
    statusMessage = "";
  }
  function displayErrorMessage(message) {
    errorMessage = message;
    successMessage = "";
    statusMessage = "";
  }
  function displayStatusMessage(message) {
    statusMessage = message;
    errorMessage = "";
    successMessage = "";
  }
  async function updateUI() {
    // allFiles = [];
    // const addedFIles = getDocuments();
    allFiles = await getDocuments(supabaseClient, userId);
  }

  function handleTextareaInput() {
    const textarea = document.getElementById("question");
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      30 * parseFloat(getComputedStyle(textarea).lineHeight)
    )}px`;
  }

  let menuOpen = false;

  async function selectPrompt(prompt) {
    instructions = prompt;
    menuOpen = false;
    document.removeEventListener("click", handleOutsideClick);
    const { data: updateData, error: updateError } = await supabaseClient
      .from("chats")
      .update({ current_instruction: instructions })
      .eq("chat_id", selectedThreadId);
  }
  const handleOutsideClick = (event) => {
    const dropdown = document.getElementById("promptOptions");
    const toggleButton = document.querySelector(".dropdown-toggle-btn");
    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      menuOpen = false;
      document.removeEventListener("click", handleOutsideClick);
    }
  };
  async function download(fileId) {
    try {
      let fileResponse = await fetch("/api/ask/downloadFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId: fileId, // Replace with your actual assistant ID
        }),
      });

      // Check if the response is successful
      if (!fileResponse.ok) {
        throw new Error("Failed to download file");
      }
      let bufferView = await fileResponse.blob();
      // Convert Uint8Array to Blob
      const blob = new Blob([bufferView]);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.style.display = "none";
      let fileName = await retrieveFileName(fileId);
      // Set the download attribute and the href to Blob URL
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);

      // Append the anchor element to the body and simulate a click
      document.body.appendChild(a);
      a.click();
      // Remove the anchor element after download
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Handle error if needed
    }
  }
  function showUpload() {
    const popupContainer = document.getElementById("upload");
    popupContainer.style.display = "flex";
  }

  function handleTextareaKeyDownInstructions(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setInstructions(selectedThreadId);
    }
  }
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>
<AuthCheck>
  <div
    class="  flex w-full bg-white p-4 text-black"
    style=" postion: relative;  overflow: scroll; height:100vh"
  >
    <!-- Combined Sidebar - Chat History and Configuration -->
    <div
      class={`sidebar absolute left-0 top-0 bg-black p-4 text-white ${
        isChatHistorySidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <div class="overflow-y-auto">
        <div
          style="overflow-y: auto; flex: 1; height: 100%; width:100%; display: flex; justify-content: space-between; align-items: center; padding-top: 60px;"
        >
          <a
            href="/"
            class="cursor-pointer text-xl font-bold hover:text-blue-400"
          >
            James
          </a>
          <a href="/profile" class="cursor-pointer text-xl hover:text-blue-400">
            <i style="font-size:15px" class="fa">&#xf013;</i>
          </a>
        </div>

        <h2 class="text-l sm:text-l mb-4 mr-3 mt-5 font-semibold">
          Personalise James:
        </h2>

        <section class="relative">
          <div class="textarea-wrapper relative flex">
            <div class="textarea-container relative flex-grow">
              <textarea
                rows="3"
                bind:value={instructions}
                on:keydown={handleTextareaKeyDownInstructions}
                id="instructions"
                class="textarea textarea-accent w-full resize-none"
                placeholder="Enter personalized instructions..."
                style="font-size: small; background-color: #222; outline: none;"
              ></textarea>

              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="dropdown-toggle-btn"
                on:click={() => {
                  if (menuOpen === true) {
                    menuOpen = false;
                    document.removeEventListener("click", handleOutsideClick);
                  } else {
                    menuOpen = true;
                    setTimeout(() => {
                      document.addEventListener("click", handleOutsideClick);
                    }, 500);
                  }
                }}
                aria-haspopup="true"
                aria-controls="promptOptions"
              >
                {#if menuOpen}
                  <i
                    class="chevron fas fa-chevron-down text-l"
                    style="color: #333;"
                  />
                {:else}
                  <i
                    class="chevron fas fa-chevron-left text-l"
                    style="color: #333;"
                  />
                {/if}
              </div>
              {#if menuOpen && savedPrompts.length > 0}
                <div
                  id="promptOptions"
                  class="dropdown-options dark-bg max-h-[40vh] w-full overflow-auto rounded"
                >
                  {#each savedPrompts as item}
                    {#if item !== instructions}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <!-- svelte-ignore a11y-no-static-element-interactions -->
                      <div
                        on:click={() => selectPrompt(item)}
                        class="dropdown-item cursor-pointer"
                      >
                        {item}
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </section>
        <button
          class="btn btn-primary btn-xs mt-2"
          style=" font-size: xs; text-transform: none; color: white;"
          on:click={() => setInstructions(selectedThreadId)}
          disabled={selectedThreadId === null}
        >
          Save Changes
        </button>
        <h2 class="mb-4 mt-5 text-2xl font-bold">Chat History</h2>
        <button
          class="btn btn-primary btn-sm mb-5"
          style="color: white;"
          on:click={createNewChat}
        >
          <i class="fas fa-plus" /> New Chat
        </button>
        {#if $userChats.length > 0}
          <!-- <div class="overflow-y-auto h-96"> -->
          {#each $userChats as chat}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div
              class="chat-box mb-2 flex items-center justify-between"
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
          {#if $userChatsRemaining.length > 0}
            <button
              class="btn btn-primary btn-sm mb-5"
              style="color: white;"
              on:click={loadMoreChats}
            >
              Load More Chats
            </button>
          {/if}
        {:else}
          <!-- Loading indicator when there are no chats -->
          <div class="ml-2 mt-5 text-left text-gray-500">
            <i class="fas fa-spinner fa-spin mr-3"></i> Loading Chats...
          </div>
        {/if}
      </div>
    </div>

    <div
      class={`main-content h-full w-full ${
        isChatHistorySidebarOpen ? "main-content-shifted" : ""
      }`}
      style="display: flex;
      flex-direction: column;"
    >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->

      <Upload />
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

      <!-- <NavBar /> -->

      <!-- Middle Section - Chat Messages -->
      <div
        class={`chat-container h-full w-full  ${
          isChatHistorySidebarOpen ? "main-content-shifted" : ""
        }`}
        style="display: flex;
      flex-direction: column; flex: 1;"
      >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          id="popupOverlay"
          class="popup-overlay"
          on:click={() => closePopup()}
        >
          <div id="popupContainer" class="popup-container">
            <button
              class="close-btn text-black"
              style="position: absolute; top: 10px; left: 25px;"
              on:click={() => closePopup()}>&times;</button
            >
            <h2 class="popup-title mt-5 pl-20 text-black">
              Your Uploaded Files
            </h2>
            {#if statusMessage !== "" || successMessage !== "" || errorMessage !== ""}
              <div
                style="margin-bottom: 10px; font-size: 16px; padding: 5px; text-align: center; border-radius: 8px; font-weight:700; width: 100%; word-wrap: break-word; overflow-wrap: break-word;"
              >
                <div id="statusMessage" style="color: blue;">
                  {statusMessage}
                </div>
                <div id="successMessage" style="color: green;">
                  {successMessage}
                </div>
                <div id="errorMessage" style="color: red;">
                  {errorMessage}
                </div>
              </div>
            {/if}

            <div id="fileList" class="file-list">
              {#each allFiles as file}
                <li style="margin-bottom: 10px">
                  <div
                    class="file-info text-black"
                    style="display: flex; align-items: center;"
                  >
                    <div class="text-wrap" style="width: 80%;">
                      {file.filename}
                    </div>
                    <button
                      class="btn btn-square text-black"
                      on:click={() => {
                        if (addedFileIds.includes(file.id)) {
                          removeFileFromAssistant(file.id, file.filename);
                        } else {
                          addFileToAssistant(file.id, file.filename);
                        }
                      }}
                    >
                      {#if addedFileIds.includes(file.id)}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="red"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      {:else}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="green"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v12M6 12h12"
                          />
                        </svg>
                      {/if}
                    </button>
                  </div>
                </li>
              {/each}
            </div>
            <button
              class="btn btn-primary text-white"
              on:click={() => {
                closePopup();
                showUpload();
              }}>Upload More Files</button
            >
          </div>
        </div>

        <!-- <h1 class="text-4xl font-bold mb-8">Chat Messages</h1> -->
        <!-- <h1 class="text-xl sm:text-2xl md:text-3xl font-bold mb-8 mt-5">
          Chat Messages
        </h1> -->
        {#if selectedThreadId === null || selectedThreadId === undefined || $selectedChatMessages.length === 0}
          <div
            style="overflow-y: auto; flex: 1; height: 100%; width:100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"
          >
            <a
              href="/"
              class="cursor-pointer text-4xl font-bold hover:text-blue-600"
            >
              James
            </a>
            <p class="mt-2 mb-10 text-center text-sm text-gray-500">
              Select a chat from the history to view messages.
            </p>
            <img
              loading="lazy"
              src="logo.png"
              class="aspect-[1] object-contain object-center overflow-hidden self-center"
              style="height: 50vh"
            />
          </div>
        {:else}
          <div
            id="messages-section"
            style="overflow: auto; flex: 1; height: 100%; width:100%; resize: none;"
          >
            <div style="height: 10px; width:100%">
              {#each $selectedChatMessages as message, index (index)}
                <div
                  class="chat-message"
                  style="text-wrap:wrap; word-wrap:break-word; overflow-wrap:break-word; width:100%"
                  class:is-user-message={message.is_user_message}
                >
                  {#if message.is_user_message}
                    <pre
                      style="text-wrap:wrap; word-wrap:break-word; overflow-wrap:break-word; width:100%">{message.message}</pre>
                  {:else}
                    {#each formatMessage(message) as { type, content, language, originalCode }, i (i)}
                      {#if type === "markdown"}
                        <span>{@html content}</span>
                      {/if}
                      {#if type === "code"}
                        <div
                          class="code-block-container"
                          style="text-wrap:wrap; word-wrap:break-word; overflow-wrap:break-word; width:100%"
                        >
                          <div
                            class="code-block-banner"
                            style="text-wrap:wrap; word-wrap:break-word; overflow-wrap:break-word; width:100%"
                          >
                            {language}
                            <button
                              class="copy-button"
                              on:click={() => copyToClipboard(originalCode)}
                              >{copyButtonText}</button
                            >
                          </div>
                          <pre
                            class="code-block"
                            style="text-wrap:wrap; word-wrap:break-word; overflow-wrap:break-word; width:100%">{@html content}</pre>
                        </div>
                      {/if}
                    {/each}
                    {#if message.annotations !== undefined}
                      <div class="file-citations">
                        {#each message.annotations as annotation}
                          {#if annotation.file_citation}
                            <p class="file-citation">
                              <span class="annotation-index"
                                >{annotation.text}</span
                              >
                              Lines {annotation.start_index}
                              to {annotation.end_index}
                            </p>
                            <!-- <pre>
                  "{annotation.file_citation.quote.substring(
                              0,
                              30
                            )}..." from {message.file_names[
                              message.annotations.indexOf(annotation)
                            ]}
                  </pre> -->
                          {/if}
                          {#if annotation.file_path}
                            <p class="file-path">
                              <span class="annotation-index"
                                >{annotation.text}</span
                              >
                              <button
                                on:click={() =>
                                  download(annotation.file_path.file_id)}
                                ><i class="fas fa-download"></i>
                              </button>
                              <!-- <a
                                href="/files/{annotation.file_path.file_id}"
                                target="_blank">Download File</a
                              > -->
                            </p>
                          {/if}
                        {/each}
                      </div>
                    {/if}
                    {#if message.generated_files !== undefined && message.generated_files.length > 0}
                      <div>
                        <p>Generated Files:</p>
                        <ul>
                          {#each message.generated_files as file, i (i)}
                            <li>
                              <a href={file.download_link} download={file.name}
                                >{file.name}</a
                              >
                            </li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  {/if}
                </div>
              {/each}
              <!-- <div id="spacing" style="height: 200px"></div> -->
            </div>
          </div>
        {/if}
        {#if loading}
          <div class="mt-3" style="display: flex; justify-content: center;">
            <div
              style="font-size: 16px; text-align: center; margin-bottom: 10px;"
              class="text-gray-600"
            >
              James is thinking...
            </div>
            <button
              class="btn btn-xs btn-outline btn-error ml-5"
              on:click={stopRun}>Stop</button
            >
          </div>
        {/if}
        <!-- Bottom Section - Textarea and Send Button -->
        <div class="flex flex-row" style="display: flex; align-items: center;">
          <!-- Toggle 1 -->
          <div class="form-control mr-5" style="background-color: white;">
            <label class="label cursor-pointer">
              <span class="label-text mr-3" style="color: #666">Retrieval</span>
              <input
                type="checkbox"
                class="toggle toggle-sm toggle-accent"
                on:click={() => (retrievalEnabled = !retrievalEnabled)}
                checked={retrievalEnabled}
              />
            </label>
          </div>

          <!-- Toggle 2 -->
          <div class="form-control mr-5" style="background-color: white;">
            <label class="label cursor-pointer">
              <span class="label-text mr-3" style="color: #666;"
                >Code Interpreter</span
              >
              <input
                type="checkbox"
                class="toggle toggle-sm toggle-accent"
                checked={codeInterpreterToggle}
                disabled={codeInterpreterEnabledDatabase}
                on:click={async () => {
                  codeInterpreterToggle = !codeInterpreterToggle;
                }}
              />
            </label>
          </div>

          <div class="form-control" style="background-color: white;">
            <label class="label cursor-pointer">
              <span class="label-text mr-3" style="color: #666;"
                >Reload Chat</span
              >
              <button
                style=" color: #666; border: none;"
                on:click={async () => {
                  await selectChat(selectedThreadId);
                }}
              >
                <i class="fas fa-sync-alt"></i>
              </button>
            </label>
          </div>
        </div>

        <div class="mx-30" style="position: relative; width: 100%;">
          <div class="items-bottom flex">
            <div class="form-control flex-1" style="position: relative;">
              <textarea
                bind:value={questionTextArea}
                id="question"
                class="textarea textarea-primary resizeable-textarea"
                placeholder="Ask James anything..."
                disabled={selectedThreadId === null}
                on:input={handleTextareaInput}
                on:keydown={handleTextareaKeyDown}
              ></textarea>

              {#if addedFileIds && addedFileIds.length > 0 && addedFileNames && addedFileNames.length > 0}
                <div
                  class="file-box mt-2"
                  style="position: relative; left: 0; right: 0; z-index: 2; max-width: 65vw; overflow-x: auto; "
                >
                  {#each addedFileNames as filename, index (index)}
                    <div
                      class="relative mb-1 ml-2 mr-2 mt-1 flex items-center rounded-lg bg-gray-800"
                      style="white-space: nowrap;"
                    >
                      <p class="m-2 text-sm text-white">
                        {filename}
                      </p>
                      <button
                        class="remove-file-btn absolute right-0 top-0 transform bg-red-500"
                        on:click={() =>
                          removeFileFromAssistant(
                            addedFileIds[index],
                            filename
                          )}
                      >
                        <i
                          class="fa fa-times absolute right-1 top-0.5 transform text-xs text-white"
                        ></i>
                      </button>
                    </div>
                  {/each}
                </div>
              {:else}
                <div
                  class="no-files-text"
                  style="position: relative; left: 5px; top: 5px; z-index: 2;"
                >
                  You have no files in this conversation. Click the paperclip to
                  add files.
                </div>
              {/if}
              <div
                class="button-container"
                style="position: absolute; right: 15px; z-index: 2; display: flex; gap: 10px;"
              >
                <button class="add-attachment-btn" on:click={() => addFiles()}>
                  <i class="fa fa-paperclip"></i>
                </button>
                <button
                  class="send-msg-btn"
                  on:click={() => sendUserMessageAndAIResponse()}
                  disabled={selectedThreadId === null ||
                    loading ||
                    questionTextArea === ""}
                >
                  <i class="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {#if errorText !== null}
          <div class="absolute right-4 top-4 rounded bg-red-600 p-2 text-white">
            {errorText}
          </div>
        {/if}
      </div>
    </div>
  </div>
</AuthCheck>

<style>
  .textarea-container {
    position: relative;
    display: flex;
  }

  .dropdown-toggle-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 1;
  }

  .dropdown-options {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    top: 110%;
    right: 0;
    background-color: #333; /* Dark mode background color */
    /* border: 1px solid #ddd; */
    z-index: 2;
  }

  .dropdown-item {
    padding: 8px;
    color: #fff; /* Text color for dark mode */
    transition: background-color 0.3s;
  }

  .dropdown-item:hover {
    background-color: #555; /* Darker color on hover */
  }
  .resizeable-textarea {
    position: relative;
    z-index: 2;
    width: 100%;
    resize: none;
    border-radius: 15px; /* Adjust the value for the desired corner roundness */
    border-width: 1px; /* Increase thickness of the border */
    height: auto;
    padding-right: 100px;
    padding-left: 10px;
    padding-top: 10px;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border-color: #3498db;
    outline: none;
  }

  .no-files-text {
    position: relative;
    bottom: 7px;
    left: 10px;
    z-index: 3;
    padding: 5px;
    /* background-color: #f0f0f0; Change to desired color */
    border-radius: 5px;
    font-size: 12px;
    color: #7e7d7d; /* Change to desired color */
  }

  .button-container {
    position: absolute;
    display: flex;
    justify-content: flex-end; /* Adjust alignment to the right */
    right: 15px;
    z-index: 3;
    top: 15px; /* Adjusted to match the bottom spacing */
  }

  .add-attachment-btn,
  .send-msg-btn {
    margin-left: 5px; /* Adjusted margin for spacing */
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

  .file-box {
    position: relative;
    border-radius: 8px;
    /* padding-left: 10px;
    padding-right: 35px; */
    padding-top: 2px;
    overflow-x: scroll;
    overflow-y: hidden;
    align-items: left;
    display: flex;
    bottom: 2px; /* Adjusted to leave space for buttons */
    left: 0;
    right: 0;
    z-index: 3;
  }

  /* Adjust the positioning of the close button */
  .remove-file-btn {
    border-radius: 50%;
    height: 15px;
    width: 15px;
  }

  .close-btn {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    outline: none;
    font-size: 1.5em;
  }

  .popup-title {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 1em;
  }

  .popup-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 6;
  }

  .popup-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background: #2c3e50; */
    background: white;
    color: white;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-top: 5px;
    padding-left: 12px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    max-height: 80vh;
    overflow: hidden;
    z-index: 7;
    display: flex;
    flex-direction: column;
  }

  .file-list {
    list-style: none;
    position: relative;
    padding-left: 20px;
    flex: 1;
    padding: 10px;
    overflow-y: scroll;
    margin-bottom: 5px;
  }

  .file-info {
    display: flex;
    /* align-items: center; */
    word-wrap: break-word;
    white-space: normal;
    justify-content: space-between;
  }

  .btn.btn-square {
    border-radius: 4px;
    padding: 10px;
    color: green;
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
    font-size: 14px;
    background-color: black;
    padding: 10px;
    border-radius: 0px 0px 8px 8px;
    overflow-x: auto;
    word-wrap: break-word; /* Add this line to prevent overflow of long words */
    color: white; /* Set font color to white */
  }

  /* Remaining CSS rules */
  .code-block-container {
    overflow-x: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .code-block-banner {
    background-color: #5616c6;
    padding: 5px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
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
    color: #0000ff; /* Set blue color for user message */
  }

  /* Responsive layout using media queries */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    overflow: scroll;
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
      z-index: 4;
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
      z-index: 3;
    }
  }

  @media screen and (min-width: 769px) {
    /* Adjust styles for screens larger than 768px (800px in this case) */
    .main-content.main-content-shifted {
      margin-left: 300px; /* Set to 300px when the sidebar is open on screens larger than 800px */
    }
    /* .popup-container.main-content-shifted {
      margin-left: 300px;
    } */
  }
  /* Additional global styles go here */
</style>
