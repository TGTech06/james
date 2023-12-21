// Update the getDocuments function to use the OpenAI API
export async function getDocuments(client, assistantId) {
  try {
    // Use the OpenAI API client to retrieve the list of files
    const filesResponse = await client.beta.assistants.files.list(assistantId);
    console.log("Files response:", filesResponse);

    const listOfFiles = filesResponse.data;
    let documents = [];

    // Loop through each file and retrieve the file name and size
    for (const file of listOfFiles) {
      const fileDetails = await client.files.retrieve(file.id);
      documents.push(fileDetails);
    }
    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    // Handle error as needed
    return [];
  }
}

export async function deleteDocument(client, assistantId, fileId) {
  try {
    // Use the OpenAI API client to delete the assistant file
    const deleteResponse = await client.beta.assistants.files.delete(
      assistantId,
      fileId
    );

    if (deleteResponse.status === "ok") {
      console.log(`Successfully deleted file with ID ${fileId}`);
      // Add any additional UI logic or state updates as needed
    } else {
      console.error(`Error deleting file with ID ${fileId}`);
      // Handle error as needed
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle error as needed
  }
}

// export async function deleteDocument(supabase, documentName) {
//   // Delete the document from the database
//   try {
//     const response = await supabase
//       .from("documents")
//       .delete()
//       .match({ "metadata->>file_name": documentName });
//     if (response.error == null) {
//       // Document deleted successfully
//       return true;
//     } else {
//       // Document not found or not deleted
//       return false;
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return false;
//   }
// }
