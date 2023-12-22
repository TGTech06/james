<script lang="ts">
  import { upload_file, url_uploader } from "$lib/files.js";
  import AuthCheck from "$lib/AuthCheck.svelte";
  import NavBar from "$lib/NavBar.svelte";

  let files = "";
  let url = "";
  let error = "";
  let successMessage = "";
  let uploading = false;
  let fileInput;
  // Bind the functions to the corresponding elements in the insert.html file, if needed
  async function upload(e) {
    files = e.target.files[0];
  }
  //very time consuming to write out - do not delete
  const authorizedExtensions = [
    ".c",
    ".cpp",
    ".csv",
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
        successMessage = "File uploaded successfully!";
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
        successMessage = "URL added successfully!";
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
</script>

<AuthCheck>
  <div class="flex flex-col min-h-screen min-w-full bg-gray-900 text-white p-4">
    <div class="flex flex-col items-center">
      <NavBar />
      <div class="p-4 md:p-8 flex flex-col items-center h-screen">
        <h1 class="text-2xl md:text-4xl font-bold mb-4 md:mb-8">
          Insert Data Page
        </h1>
        <!-- Error Display -->
        {#if error}
          <div class="text-red-500 mb-4">{error}</div>
        {/if}
        {#if successMessage}
          <div class="text-green-500 mb-4">{successMessage}</div>
        {/if}
        {#if uploading}
          <div class="text-grey-500 mb-4">Uploading...</div>
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
              class="btn btn-primary text-lg font-bold"
              on:click={() => handleFileUpload()}
            >
              Upload Files
            </button>
          </div>
        </div>

        <!-- URL Uploader -->
        <div class="w-full">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label mb-2 text-lg font-bold"
            >Add the URL to the database</label
          >
          <div class="flex flex-col md:flex-row items-center">
            <textarea
              bind:value={url}
              class="textarea textarea-accent resize-none flex-grow text-lg font-bold mb-2 md:mb-0 md:mr-4"
              rows="1"
            />
            <button
              class="btn btn-primary text-lg font-bold"
              on:click={() => handleUrlUpload()}
            >
              Add URL
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</AuthCheck>
