export async function getDocuments(supabaseClient, userId) {
  try {
    // Use the Supabase client to retrieve the list of file IDs from user_data table
    const { data: userData, error: userError } = await supabaseClient
      .from("user_data")
      .select("file_list")
      .eq("user_id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return [];
    }

    const fileIds = userData ? userData.file_list || [] : [];
    let documents = [];

    // Loop through each file ID and retrieve the file details using OpenAI API
    for (const fileId of fileIds) {
      const fileDetailsResponse = await fetch("/api/ask/retrieveFileDetails", {
        method: "POST",
        body: JSON.stringify({
          fileId: fileId,
        }),
      });
      const fileDetails = await fileDetailsResponse.json();
      documents.push(fileDetails);
    }

    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    // Handle error as needed
    return [];
  }
}

// export async function getFileContent(openaiClient, fileId) {
//   try {
//     // Use the OpenAI API client to retrieve file content
//     const file = await openaiClient.files.retrieveContent(fileId);
//     console.log("File:", file);
//     return file;
//   } catch (error) {
//     console.error("Error retrieving file:", error);
//     return "";
//   }
// }

export async function deleteDocument(supabaseClient, fileId, userId) {
  try {
    // Remove the file ID from the file_list in user_data
    const { data: userData, error: userError } = await supabaseClient
      .from("user_data")
      .select("file_list")
      .eq("user_id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return "Error deleting file";
    }

    const fileIds = userData ? userData.file_list || [] : [];
    const updatedFileList = fileIds.filter((id) => id !== fileId);

    // Update the file_list column in user_data
    const { error: updateError } = await supabaseClient
      .from("user_data")
      .update({ file_list: updatedFileList })
      .eq("user_id", userId);

    if (updateError) {
      console.error("Error updating user data:", updateError);
      return "Error deleting file";
    }
    // Delete the file using OpenAI API
    const formData = new FormData();
    formData.append("fileId", fileId);
    const fileDetailsResponse = await fetch("/api/ask/deleteDocuments", {
      method: "DELETE",
      body: formData,
    });
    const fileDetails = await fileDetailsResponse.text();
    return fileDetails;
  } catch (error) {
    console.error("Error:", error);
    return "Error deleting file";
  }
}
