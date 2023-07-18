class Document {
  constructor(pageContent, metadata) {
    this.page_content = pageContent;
    this.metadata = metadata;
  }
}

export async function processFile(
  vectorStore,
  file,
  loaderClass,
  fileSuffix,
  chunkSize,
  chunkOverlap
) {
  let fileSha = "";
  const fileName = file.name;
  const fileSize = file.size;
  const dateShort = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const reader = new FileReader();

  reader.onload = async (event) => {
    const buffer = event.target.result;

    // Compute SHA-1 hash
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    fileSha = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const tmpFilePath = URL.createObjectURL(blob);

    const loader = new loaderClass(tmpFilePath);
    const documents = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter(chunkSize);
    const splitDocumentsPromise = textSplitter.splitDocuments(documents);
    const splitDocuments = await splitDocumentsPromise;

    const docsWithMetadata = splitDocuments.map((doc) => {
      const metadata = {
        file_sha1: fileSha,
        file_size: fileSize,
        file_name: fileName,
        chunk_size: chunkSize,
        chunk_overlap: chunkOverlap,
        date: dateShort,
      };
      return new Document(doc.pageContent, metadata);
    });

    vectorStore.addDocuments(docsWithMetadata);

    // Clean up the temporary file URL
    URL.revokeObjectURL(tmpFilePath);
  };

  reader.onerror = (event) => {
    console.error("Error reading file:", event.target.error);
  };

  reader.readAsArrayBuffer(file);
}
