<script lang="ts">
  import {
    upload_file,
    url_uploader,
    create_file_and_upload,
  } from "$lib/files.js";

  let files = "";
  let url = "";
  let error = "";
  let successMessage = "";
  let uploading = false;
  let fileInput;
  let textTitle = "";
  let textContent = "";

  async function upload(e) {
    files = e.target.files[0];
  }

  const authorizedExtensions = [
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
    //code interpreter
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

  async function handleFileUpload() {
    if (uploading || files === "") return;
    error = "";
    uploading = true;
    successMessage = "";
    try {
      let outcome = await upload_file(files);
      if (outcome === "success") {
        files = "";
        fileInput.value = "";
        error = "";
        successMessage =
          "File uploaded successfully! You can now add it to the chat by clicking the paperclip icon again.";
      } else {
        if (outcome === "" || outcome === undefined || outcome === null) {
          error =
            "An error occurred. Please try again. If the problem persists, please let me know.";
        } else {
          error = outcome;
        }
      }
    } catch (err) {
      error = err.message;
    }
    uploading = false;
  }

  async function handleUrlUpload() {
    if (uploading || url === "") return;
    error = "";
    uploading = true;
    successMessage = "";
    try {
      let outcome = await url_uploader(url);
      if (outcome === "success") {
        url = "";
        successMessage =
          "URL added successfully! You can now add it to the chat by clicking the paperclip icon again.";
      } else {
        if (outcome === "" || outcome === undefined || outcome === null) {
          error =
            "An error occurred. Please try again. If the problem persists, please let me know.";
        } else {
          error = outcome;
        }
      }
    } catch (err) {
      error = err.message;
    }
    uploading = false;
  }

  async function uploadText() {
    uploading = true;
    successMessage = "";
    error = "";
    try {
      if (textTitle === "" || textContent === "") {
        error = "Please enter both title and content to upload text.";
        uploading = false;
        return;
      }
      // Add your implementation here to call the function and pass title and content
      await create_file_and_upload(textTitle, textContent);
      successMessage =
        "Text uploaded successfully! You can now add it to the chat by clicking the paperclip icon again.";
      // Clear the input fields after successful upload
      textTitle = "";
      textContent = "";
    } catch (err) {
      error = err.message;
    }
    uploading = false;
  }

  function closeUpload(event) {
    const popupContainer = document.getElementById("upload");
    if (event.target.id === "upload" || event.target.id === "close-btn") {
      popupContainer.style.display = "none";
    }
  }

  function handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleUrlUpload();
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="upload"
  style="position: fixed;
  display: none;
z-index: 6;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);"
  on:click={(event) => closeUpload(event)}
>
  <div
    style="position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); z-index: 8; max-width: 95vw;
  max-height: 90vh;
  overflow: scroll;"
    class="bg-white text-black rounded-lg p-4"
  >
    <button
      id="close-btn"
      class="close-btn text-black"
      style="position: absolute; top: 10px; left: 25px; font-size: 30px;"
      on:click={(event) => closeUpload(event)}>&times;</button
    >
    <h1 class="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">
      Add Knowledge
    </h1>
    {#if error}
      <div class="text-red-500 mb-4 text-center">{error}</div>
    {/if}
    {#if successMessage}
      <div class="text-green-500 mb-4 text-center">{successMessage}</div>
    {/if}
    {#if uploading}
      <div class="text-grey-500 mb-4 text-center">Uploading...</div>
    {/if}

    <!-- File Uploader -->
    <div class="w-full mb-4 md:mb-8">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label mb-2 text-lg font-bold">Upload Files</label>
      <div class="flex flex-col md:flex-row items-center">
        <input
          type="file"
          multiple
          on:change={upload}
          accept={authorizedExtensions.join(",")}
          required
          class="input input-accent mr-0 md:mr-4 mb-2 md:mb-0"
          bind:this={fileInput}
        />
        <button
          class="btn btn-primary text-lg font-bold text-white"
          on:click={() => handleFileUpload()}
        >
          Upload Files
        </button>
      </div>
      <p class=" text-gray-500 mt-2" style="font-size: xx-small;">
        Accepts: {authorizedExtensions.join(", ")}
      </p>
    </div>

    <!-- URL Uploader -->
    <div class="w-full mb-4">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label mb-2 text-lg font-bold"
        >Add the URL to the database</label
      >
      <div class="flex flex-col md:flex-row items-center">
        <textarea
          bind:value={url}
          on:keydown={handleTextareaKeyDown}
          class="textarea textarea-accent resize-none flex-grow text-lg mb-2 md:mb-0 md:mr-4"
          rows="1"
        />
        <button
          class="btn btn-primary text-lg font-bold text-white"
          on:click={() => handleUrlUpload()}
        >
          Add URL
        </button>
      </div>
    </div>
    <!-- Text Uploader -->
    <div class="w-full">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label mb-2 text-lg font-bold">Upload Text</label>
      <div class="flex flex-col items-left">
        <input
          type="text"
          bind:value={textTitle}
          placeholder="Title"
          class="input input-accent font-bold mb-10 md:mb-0"
        />

        <textarea
          bind:value={textContent}
          placeholder="Text content"
          class="textarea textarea-accent resize-none flex-grow text-lg mt-5 mb-2 md:mb-0"
          rows="3"
        />

        <button
          class="btn btn-primary text-lg font-bold mt-5 text-white"
          on:click={() => uploadText()}
        >
          Upload Text
        </button>
      </div>
    </div>
  </div>
</div>
