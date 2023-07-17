// @ts-nocheck
export function brain(supabase) {
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

      // Render metrics
      // You can customize how the metrics are displayed in your Svelte app
      console.log("Total Documents:", totalDocuments);
      console.log("Total Size (bytes):", totalSize);

      // Render each document
      uniqueData.forEach((document) => {
        // Create a unique key for each button by using the document name
        const buttonKey = `delete_${document.name}`;

        // Render the document name, size, and delete button
        console.log(`**${document.name}** (${document.size} bytes)`);

        // Handle delete button click
        // Replace `delete_document` with the actual function to delete the document
        const deleteDocument = () => {
          delete_document(supabase, document.name);
        };

        // Render the delete button
        console.log("❌");
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function delete_document(supabase, documentName) {
  // Delete the document from the database
  supabase
    .from("documents")
    .delete()
    .match({ "metadata->>file_name": documentName })
    .then((response) => {
      if (response.data.length > 0) {
        console.log(`✂️ ${documentName} was deleted.`);
      } else {
        console.log(`❌ ${documentName} was not deleted.`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
