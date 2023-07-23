export async function getDocuments(supabase) {
  // List all documents
  const response = await supabase
    .from("documents")
    .select("name:metadata->>file_name, size:metadata->>file_size", {
      count: "exact",
    });

  const documents = response.data;

  // Remove duplicates and sort the list of documents by size in decreasing order
  const uniqueData = documents.reduce((acc, doc) => {
    const existingDoc = acc.find((d) => d.name === doc.name);
    if (!existingDoc) {
      acc.push(doc);
    }
    return acc;
  }, []);

  uniqueData.sort((a, b) => parseInt(b.size) - parseInt(a.size));

  return uniqueData;
}

export function brain(supabase, handleDeleteDocument) {
  // List all documents
  supabase
    .from("documents")
    .select("name:metadata->>file_name, size:metadata->>file_size", {
      count: "exact",
    })
    .then((response) => {
      const documents = response.data;

      // Remove duplicates and sort the list of documents by size in decreasing order
      const uniqueData = documents.reduce((acc, doc) => {
        const existingDoc = acc.find((d) => d.name === doc.name);
        if (!existingDoc) {
          acc.push(doc);
        }
        return acc;
      }, []);

      uniqueData.sort((a, b) => parseInt(b.size) - parseInt(a.size));

      // Display some metrics
      const totalDocuments = uniqueData.length;
      const totalSize = uniqueData.reduce(
        (acc, doc) => acc + parseInt(doc.size),
        0
      );

      // Get the display container
      const displayContainer = document.getElementById("displayText");

      // Render metrics
      displayContainer.innerHTML = `
        <p>Total Documents: ${totalDocuments}</p>
        <p>Total Size (bytes): ${totalSize}</p>
      `;

      // Render each document
      uniqueData.forEach((document) => {
        // Create a unique key for each button by using the document name
        const buttonKey = `delete_${document.name}`;

        // Render the document name, size, and delete button
        displayContainer.innerHTML += `
        <p><strong>${document.name}</strong> (${document.size} bytes) <button data-doc-name="${document.name}" onclick="handleDeleteDocument(event)">❌</button></p>
      `;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function deleteDocument(supabase, documentName) {
  // Delete the document from the database
  try {
    const response = await supabase
      .from("documents")
      .delete()
      .match({ "metadata->>file_name": documentName });
    if (response.error == null) {
      // Document deleted successfully
      return true;
    } else {
      // Document not found or not deleted
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
