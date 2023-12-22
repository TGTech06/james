export async function getDocuments(client, assistantId) {
  try {
    // Use the OpenAI API client to retrieve the list of files
    const filesResponse = await client.beta.assistants.files.list(assistantId);
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
    const deletedFromAssistants = await client.beta.assistants.files.del(
      assistantId,
      fileId
    );
    const deletedFile = await client.files.del(fileId);
    if (
      deletedFile.deleted === true &&
      deletedFromAssistants.deleted === true
    ) {
      return "success";
    } else {
      return "Error deleting file";
    }
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}
