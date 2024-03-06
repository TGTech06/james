<script lang="ts">
  import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase.js";
  import { getDocuments, deleteDocument } from "$lib/brain.js";
  import AuthCheck from "$lib/AuthCheck.svelte";
  // Initialize the Supabase client and other variables
  let documents = [];
  let userID = "";
  let userIsPremium = false;
  let assistantId;
  let successMessage = "";
  let deleting = false;
  let errorMessage = "";
  let instructions = "";
  let totalFileSize = 0;
  onMount(async () => {
    await getUserID();
    await getUserData();
    await createUserDataIfNotExists(userID);
    assistantId = await getAssistantID(userID);
    instructions = await getAssistantInstructions();
    documents = await getDocuments(supabaseClient, userID);
    calculateTotalFileSize();
  });

  function calculateTotalFileSize() {
    totalFileSize = documents.reduce(
      (total, document) => total + parseInt(document.bytes, 10),
      0
    );
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

  // Function to format timestamp to date
  function formatDate(timestamp) {
    const createdDate = new Date(timestamp * 1000);
    return `${createdDate.getDate()}/${
      createdDate.getMonth() + 1
    }/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`;
  }

  async function signOutUser() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.href = "/";
    }
  }

  async function createNewAssistant() {
    const formData = new FormData();
    formData.append("userID", userID);
    const response = await fetch("/api/general/createAssistant", {
      method: "POST",
      body: formData,
    });
    const assistantID = await response.text();
    if (response.status === 200) {
      return assistantID;
    } else {
      return null;
    }
  }

  async function getUserID() {
    try {
      let user = await supabaseClient.auth.getUser();
      userID = user.data.user.id;
    } catch (e) {
      userID = "";
      console.log(e);
    }
  }

  function formatBytes(bytes: string | number) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const bytesNumber = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;

    if (isNaN(bytesNumber)) return "Invalid Size";

    if (bytesNumber === 0) return "0 Bytes";

    const i = Math.floor(Math.log(bytesNumber) / Math.log(1024));

    return Math.round(bytesNumber / Math.pow(1024, i)) + " " + sizes[i];
  }

  async function customizeJames() {
    const formData = new FormData();
    formData.append("instructions", instructions);
    formData.append("assistantId", assistantId);
    const response = await fetch("/api/general/customizeJames", {
      method: "POST",
      body: formData,
    });
    const message = await response.text();
    // console.log(message);
  }

  async function getAssistantInstructions() {
    const formData = new FormData();
    formData.append("assistantId", assistantId);
    const response = await fetch("/api/general/getAssistantInstructions", {
      method: "POST",
      body: formData,
    });
    const message = await response.text();
    return message;
  }

  async function getUserData() {
    try {
      // Fetch user data from Supabase
      const { data, error } = await supabaseClient
        .from("user_data")
        .select("is_premium")
        .eq("user_id", userID)
        .single();
      if (error) {
        return;
      }
      if (data) {
        // Check if the user is premium based on the retrieved data
        userIsPremium = data.is_premium === true;
      }
    } catch (e) {
      console.error("Error occurred while fetching user data:", e);
    }
  }

  async function createUserDataIfNotExists(userId) {
    try {
      // Check if user data already exists
      const { data, error } = await supabaseClient
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!data && userID != null && userID != "") {
        let assistantID = await createNewAssistant();
        if (assistantID === null) {
          console.error("Error creating assistant");
          return "Error creating assistant";
        }
        // User data doesn't exist; create a new row
        const { data: insertedData, error: insertError } = await supabaseClient
          .from("user_data")
          .upsert([
            {
              user_id: userId,
              total_data_size: 0,
              is_premium: false,
              stripe_customer_id: userId,
              assistant_id: assistantID,
            },
          ]);
      }
    } catch (e) {
      console.error("Error occurred while creating user data:", e);
    }
  }
</script>

<AuthCheck>
  <div class="flex flex-col min-h-screen min-w-full bg-white text-black p-4">
    <div class="flex flex-1 mt-2 ml-5 items-start">
      <a href="/" class="text-xl font-bold hover:text-blue-600 cursor-pointer">
        James
      </a>
      <a href="/chat" class="text-lg hover:text-blue-600 ml-10"> Chat </a>
    </div>
    <div class="flex flex-col items-center">
      <div class="mt-6">
        {#if errorMessage}
          <div class="text-red-500 mb-4">{errorMessage}</div>
        {/if}
        {#if successMessage}
          <div class="text-green-500 mb-4">{successMessage}</div>
        {/if}
        {#if deleting}
          <div class="text-grey-500 mb-4">Deleting...</div>
        {/if}
      </div>
      <div class="p-8">
        <div class="flex items-start justify-between">
          <h1 class="text-4xl font-bold mb-8">Your James</h1>
          <button
            class="btn btn-md btn-outline btn-error flex items-center"
            on:click={() => signOutUser()}
          >
            Log out
            <i class="fas fa-sign-out-alt" />
          </button>
        </div>
        <div class="mt-8">
          <p>
            Customise James. Give him personalized instructions that he has
            follow (unless you override this by specifying instructions in the
            chat)
          </p>
          <textarea
            rows="3"
            bind:value={instructions}
            id="instructions"
            class="textarea textarea-accent resize-none w-full mt-2"
            placeholder="Enter personalized instructions..."
          ></textarea>
        </div>

        <!-- Button for customization -->
        <button
          class="btn btn-primary mb-4 text-white"
          on:click={() => customizeJames()}
        >
          Customise James
        </button>
        <h2 class="text-2xl font-semibold mt-4 mb-4">
          Total File Size: {formatBytes(totalFileSize)}
        </h2>
        <!-- <div class="files-container"> -->
        <h2 class="text-2xl font-semibold mt-4 mb-4">
          Files your James has access to:
        </h2>
        <div class="space-y-4">
          {#each documents as document}
            <div
              class="border border-gray-600 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p class="text-lg">
                  <strong class="text-l">{document.filename}</strong>
                  <br />
                  <span class="text-sm">{formatBytes(document.bytes)}</span>
                  <span class="text-sm"
                    >Created: {formatDate(document.created_at)}</span
                  >
                </p>
              </div>
              <button
                class="btn btn-error"
                on:click={async () => {
                  if (deleting) return;
                  deleting = true;
                  successMessage = "";
                  errorMessage = "";
                  let filename = document.filename;
                  let outcome = await deleteDocument(
                    supabaseClient,
                    document.id,
                    userID
                  );
                  if (outcome === "success") {
                    documents = await getDocuments(supabaseClient, userID);
                    successMessage =
                      "Successfully deleted " + filename + " from your James";
                    calculateTotalFileSize();
                  } else {
                    errorMessage = outcome;
                  }
                  deleting = false;
                }}
              >
                <i class="fas fa-trash white-icon" />
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</AuthCheck>

<style>
  .btn-md {
    padding: 12px 24px; /* Adjust the padding to make the button larger */
    font-size: 16px; /* Adjust the font size to make the icon larger */
  }
</style>
