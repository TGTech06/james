// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// class Document {
//   constructor(pageContent, metadata) {
//     this.page_content = pageContent;
//     this.metadata = metadata;
//   }
// }

// export async function processFile(
//   vectorStore,
//   file,
//   loaderClass,
//   fileSuffix,
//   chunkSize,
//   chunkOverlap
// ) {
//   let fileSha = "";
//   const fileName = file.name;
//   const fileSize = file.size;
//   const dateShort = new Date().toISOString().slice(0, 10).replace(/-/g, "");

//   const reader = new FileReader();

//   reader.onload = async (event) => {
//     const buffer = event.target.result;

//     // Compute SHA-1 hash
//     const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     fileSha = hashArray
//       .map((byte) => byte.toString(16).padStart(2, "0"))
//       .join("");

//     const blob = new Blob([buffer], { type: "application/octet-stream" });
//     const tmpFilePath = URL.createObjectURL(blob);

//     const loader = new loaderClass(tmpFilePath);
//     const documents = await loader.load();

//     const textSplitter = new RecursiveCharacterTextSplitter(chunkSize);
//     const splitDocumentsPromise = textSplitter.splitDocuments(documents);
//     const splitDocuments = await splitDocumentsPromise;

//     const docsWithMetadata = splitDocuments.map((doc) => {
//       const metadata = {
//         file_sha1: fileSha,
//         file_size: fileSize,
//         file_name: fileName,
//         chunk_size: chunkSize,
//         chunk_overlap: chunkOverlap,
//         date: dateShort,
//       };
//       return new Document(doc.pageContent, metadata);
//     });

//     vectorStore.addDocuments(docsWithMetadata);

//     // Clean up the temporary file URL
//     URL.revokeObjectURL(tmpFilePath);
//   };

//   reader.onerror = (event) => {
//     console.error("Error reading file:", event.target.error);
//   };

//   reader.readAsArrayBuffer(file);
// }

// import fs from "fs";
// import { computeSha1FromFile } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/utils.js";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// class Document {
//   constructor(page_content, metadata) {
//     this.page_content = page_content;
//     this.metadata = metadata;
//   }
// }

// export async function process_file(
//   vector_store,
//   file,
//   loader_class,
//   file_suffix,
//   chunk_size,
//   chunk_overlap
// ) {
//   let documents = [];
//   let file_sha = "";
//   let file_name = file.name;
//   let file_size = file.size;
//   let dateshort = new Date().toISOString().slice(0, 10).replace(/-/g, "");

//   // Create a temporary file with a unique name
//   const tmpFilePath = `./tmp_${Date.now()}${file_suffix}`;
//   await fs.promises.writeFile(tmpFilePath, file);

//   let loader = new loader_class(tmpFilePath);
//   documents = loader.load();
//   let file_sha1 = await computeSha1FromFile(tmpFilePath);

//   // Adjust this part based on the actual usage of RecursiveCharacterTextSplitter
//   let text_splitter = new RecursiveCharacterTextSplitter(); // Modify this line

//   documents = await text_splitter.splitDocuments(documents);

//   // Add the document sha1 as metadata to each document
//   let docs_with_metadata = documents.map(
//     (doc) =>
//       new Document(doc.pageContent, {
//         file_sha1: file_sha1,
//         file_size: file_size,
//         file_name: file_name,
//         chunk_size: chunk_size,
//         chunk_overlap: chunk_overlap,
//         date: dateshort,
//       })
//   );

//   vector_store.add_documents(docs_with_metadata);

//   // Delete the temporary file
//   await fs.promises.unlink(tmpFilePath);

//   return;
// }

// import { computeSha1FromFile } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/utils.js";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// class Document {
//   constructor(page_content, metadata) {
//     this.page_content = page_content;
//     this.metadata = metadata;
//   }
// }

// export async function process_file(
//   vector_store,
//   file,
//   loader_class,
//   file_suffix,
//   chunk_size,
//   chunk_overlap
// ) {
//   let documents = [];
//   let file_sha = "";
//   let file_name = file.name;
//   let file_size = file.size;
//   let dateshort = new Date().toISOString().slice(0, 10).replace(/-/g, "");

//   // Create a temporary file with a unique name
//   const reader = new FileReader();

//   reader.onload = async function (event) {
//     const fileData = event.target.result;
//     const tmpFilePath = `./tmp_${Date.now()}${file_suffix}`;
//     await writeFile(tmpFilePath, fileData);

//     let loader = new loader_class(tmpFilePath);
//     documents = loader.load();
//     let file_sha1 = await computeSha1FromFile(tmpFilePath);

//     // Adjust this part based on the actual usage of RecursiveCharacterTextSplitter
//     let text_splitter = new RecursiveCharacterTextSplitter(); // Modify this line

//     documents = await text_splitter.splitDocuments(documents);

//     // Add the document sha1 as metadata to each document
//     let docs_with_metadata = documents.map(
//       (doc) => new Document(doc.pageContent, { ...doc.metadata, file_sha1 })
//     );

//     // Rest of the code...
//   };

//   reader.readAsDataURL(file);
// }

// async function writeFile(path, data) {
//   const response = await fetch(path, {
//     method: "PUT",
//     body: data,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to write file");
//   }
// }

// import { computeSha1FromFile } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/utils.js";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// export async function process_file(
//   vector_store,
//   file,
//   loader_class,
//   file_suffix,
//   chunk_size,
//   chunk_overlap
// ) {
//   let documents = [];
//   let file_sha = "";
//   let file_name = file.name;
//   let file_size = file.size;
//   let dateshort = new Date().toISOString().slice(0, 10).replace(/-/g, "");

//   // Create a temporary file with a unique name
//   const tmpFilePath = `./tmp_${Date.now()}${file_suffix}`;
//   await writeFile(file, tmpFilePath);

//   let loader = new loader_class(tmpFilePath);
//   documents = loader.load();
//   let file_sha1 = await computeSha1FromFile(tmpFilePath);

//   // Adjust this part based on the actual usage of RecursiveCharacterTextSplitter
//   let text_splitter = new RecursiveCharacterTextSplitter(); // Modify this line

//   documents = await text_splitter.splitDocuments(documents);

//   // Add the document sha1 as metadata to each document
//   let docs_with_metadata = documents.map(
//     (doc) =>
//       new Document(doc.pageContent, {
//         file_sha1: file_sha1,
//         file_size: file_size,
//         file_name: file_name,
//         chunk_size: chunk_size,
//         chunk_overlap: chunk_overlap,
//         date: dateshort,
//       })
//   );

//   vector_store.add_documents(docs_with_metadata);

//   // Delete the temporary file
//   await unlink(tmpFilePath);

//   return;
// }

// function writeFile(file, filePath) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.onload = (event) => {
//       let contents;
//       if (typeof event.target.result === "string") {
//         const encoder = new TextEncoder();
//         contents = encoder.encode(event.target.result);
//       } else {
//         contents = new Uint8Array(event.target.result);
//       }

//       const blob = new Blob([contents], { type: file.type });
//       const url = URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = file.name;
//       link.style.display = "none";
//       document.body.appendChild(link);
//       link.click();
//       URL.revokeObjectURL(url);
//       document.body.removeChild(link);

//       resolve();
//     };
//     fileReader.onerror = (event) => reject(event.target.error);
//     fileReader.readAsArrayBuffer(file);
//   });
// }

// function unlink(filePath) {
//   return new Promise((resolve, reject) => {
//     // Remove the file from any storage or cleanup operations specific to your Svelte project
//     // For example, if you're using the browser's IndexedDB or Web Storage API, delete the file entry here
//     // If you're not using any specific storage, you can skip this step

//     resolve();
//   });
// }
// import { writable } from "svelte/store";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import {
//   computeSHA1FromFile,
//   computeSHA1FromContent,
// } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/utils.js";
// import { createClient } from "@supabase/supabase-js";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { Configuration, OpenAIApi } from "openai";
// import { v4 as uuidv4 } from "uuid";
// import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
// // Define the writable store variables
// class Document {
//   constructor(page_content, metadata) {
//     this.page_content = page_content;
//     this.metadata = metadata;
//   }
// }

// async function generateEmbeddings(documents) {
//   const supabase_url = "https://jqfandcxceztebtpwzxd.supabase.co";
//   const supabase_key =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4";
//   const openAIApiKey = "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";
//   const supabaseClient = createClient(supabase_url, supabase_key);
//   const configuration = new Configuration({ apiKey: openAIApiKey });
//   const openAi = new OpenAIApi(configuration);

//   // Initialize the HuggingFaceInferenceEmbeddings
//   const embeddings = new HuggingFaceInferenceEmbeddings({
//     apiKey: "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",
//   });

//   for (const document of documents) {
//     const input = document.replace(/\n/g, " ");
//     // const embedding = await embeddings._embed(input);
//     const embeddingsArray = await Promise.all(
//       input.map(async (text) => {
//         const embedding = await embeddings._embed(text);
//         return embedding;
//       })
//     );
//     const { data, error } = await supabaseClient
//       .from("documents")
//       .insert(
//         embeddingsArray.map((embedding) => ({
//           embedding,
//           id: uuidv4(),
//           content: document,
//         }))
//       )
//       .single();
//     // const embeddingResponse = await openAi.createEmbedding({
//     //   model: "text-embedding-ada-002",
//     //   input,
//     // });

//     // const [{ embedding }] = embeddingResponse.data.data;
//     // const embeddingArray = Object.values(embedding); // Extract the numeric values as an array

//     // const { data, error } = await supabaseClient.from("documents").insert([
//     //   {
//     //     content: document,
//     //     id: uuidv4(), // Generate a unique ID for each document
//     //     embedding: embedding,
//     //   },
//     // ]);
//     // await supabase
//     // .from("documents")
//     // .insert([{ content: text, embedding: embedding }])
//     // .single();

//     if (error) {
//       console.error("Error inserting document:", error);
//       // Handle the error as needed
//     } else {
//       const insertedId = data; // Access the 'id' property from the 'data' array
//       console.log(`✅ Document ${insertedId} inserted.`);
//     }
//   }
// }

// const loadDocuments = (resolvedDocsWithMetadata) => {
//   // Map the 'resolvedDocsWithMetadata' array to extract the 'page_content' property
//   const documents = resolvedDocsWithMetadata.map((doc) => doc.page_content);
//   return documents;
// };
// // Function to process the file
// export async function process_file(
//   vectorStore,
//   file,
//   loaderClass,
//   fileSuffix,
//   chunkSize,
//   chunkOverlap
// ) {
//   const documents = [];
//   const fileName = file.name;
//   const fileSize = file.size;
//   const date = new Date();
//   const dateShort = date
//     .toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     })
//     .replace(/\//g, "");

//   const tmpFile = new File([file], fileName, { type: file.type });
//   const fileSha1 = await computeSHA1FromFile(tmpFile);

//   const loader = new loaderClass(tmpFile);
//   const loadedDocuments = await loader.load();

//   const chunkSizeValue = chunkSize;
//   const chunkOverlapValue = chunkOverlap;

//   // Modify the code to match your desired text splitting logic
//   const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: chunkSizeValue,
//     chunkOverlap: chunkOverlapValue,
//   });

//   const splittedDocuments = await textSplitter.splitDocuments(loadedDocuments);

//   // Add the document sha1 as metadata to each document
//   const docsWithMetadata = splittedDocuments.map(async (doc) => {
//     const pageContent = await doc.pageContent;
//     const docSha1 = await computeSHA1FromContent(pageContent);
//     return {
//       page_content: doc.pageContent,
//       metadata: {
//         fileSha1: fileSha1,
//         fileSize: fileSize,
//         fileName: fileName,
//         chunkSize: chunkSizeValue,
//         chunkOverlap: chunkOverlapValue,
//         date: dateShort,
//         docSha1: docSha1,
//       },
//     };
//   });

//   const resolvedDocsWithMetadata = await Promise.all(docsWithMetadata);

//   // Your custom function to load docs
//   const documenti = loadDocuments(resolvedDocsWithMetadata);

//   // Generate embeddings and insert documents into the 'documents' table
//   await generateEmbeddings(documenti);

//   return;
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  computeSHA1FromFile,
  computeSHA1FromContent,
} from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/utils.js";
import { createClient } from "@supabase/supabase-js";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// Define the writable store variables
// export const chunkSize = writable(null);
// export const chunkOverlap = writable(null);

// Define the generic type for 'pageContent'

// Import statements...
import { v4 as uuidv4 } from 'uuid';

// Import statements...
// type PageContent = string; // Adjust the type based on the actual content type.

// // Define a specific type for your metadata properties
// interface Metadata {
//   fileSha1: string;
//   fileSize: number;
//   fileName: string;
//   chunkSize: number;
//   chunkOverlap: number;
//   docSha1: string;
// }

// // Define the 'Document' class with specific metadata type and optional 'id' field
// class Document<T, U> {
//   constructor(public id: string | null, public pageContent: T, public metadata: U) {}
// }

// Function to process the file
export async function process_file(
  vectorStore,
  file,
  loaderClass,
  fileSuffix,
  chunkSize,
  chunkOverlap
) {
  const documents = [];
  const fileName = file.name;
  const fileSize = file.size;
  const dateShort = new Date();

  
  const tmpFile = new File([file], fileName, { type: file.type });
  const fileSha1 = await computeSHA1FromFile(tmpFile);

  const loader = new loaderClass(tmpFile);
  const loadedDocuments = await loader.load();

  const chunkSizeValue = chunkSize;
  const chunkOverlapValue = chunkOverlap;

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSizeValue,
    chunkOverlap: chunkOverlapValue,
  });

  const splittedDocuments = await textSplitter.splitDocuments(loadedDocuments);

  // Modify the code to match your desired text splitting logic
  const splitter = {
    splitDocuments: function (documents) {
      return documents.map((doc, index) => ({
        id: uuidv4(), // Generate a unique ID for each document
        page_content: doc,
      }));
    },
  };

 // const splittedDocuments = await textSplitter.splitDocuments(loadedDocuments);

  // Add the document sha1 as metadata to each document
  // const docsWithMetadata = splittedDocuments.map(async (doc) => {
  //   const pageContent = await doc.pageContent;
  //   const docSha1 = await computeSHA1FromContent(pageContent);
  //   const id = uuidv4(); // Generate a unique ID for each document
  //   return new Document<PageContent, Metadata>(
  //     id, // Pass the generated ID
  //     pageContent,
  //     {
  //       fileSha1: fileSha1,
  //       fileSize: fileSize,
  //       fileName: fileName,
  //       chunkSize: chunkSizeValue,
  //       chunkOverlap: chunkOverlapValue,
  //       docSha1: docSha1,
  //     }
  //   );
  // });
 // const splitDocuments = splitter.splitDocuments(splittedDocuments);

  // Add the document sha1 as metadata to each document
  const docsWithMetadata = [];
  for (const doc of splittedDocuments) {
    const documentObject = {
      pageContent: doc.pageContent,
      metadata: {
        file_sha1: fileSha1,
        file_size: fileSize,
        file_name: fileName,
        chunk_size: chunkSize,
        chunk_overlap: chunkOverlap,
        date: dateShort,
      },
    };
    docsWithMetadata.push(documentObject);
  }
  // const docsWithMetadata = splittedDocuments.map((doc) => ({
  //   pageContent: doc.pageContent,
  //   metadata: {
  //     file_sha1: fileSha1,
  //     file_size: fileSize,
  //     file_name: fileName,
  //     chunk_size: chunkSize,
  //     chunk_overlap: chunkOverlap,
  //     date: dateShort,
  //   },
  // }));

  // Wait for all the docsWithMetadata to resolve
  // const resolvedDocsWithMetadata: Document<PageContent, Metadata>[] = await Promise.all(
  //   docsWithMetadata
  // );

  //console.log(resolvedDocsWithMetadata);

  
  const supabase_url = "https://jqfandcxceztebtpwzxd.supabase.co";
  const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4";
  const client = createClient(supabase_url, supabase_key);
// const openAIApiKey = "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"; 
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: "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", 
  });
 // let embeddings = new OpenAIEmbeddings({ openAIApiKey }); // Replace with your actual OpenAI API key

  let vector = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  console.log(docsWithMetadata);
  
  // // Convert the resolvedDocsWithMetadata into a plain array of objects
  // const documentsToInsert = resolvedDocsWithMetadata.map((doc) => ({
  //   id: doc.id,
  //   pageContent: doc.pageContent,
  //   metadata: doc.metadata,
  // }));

  vector.addDocuments(docsWithMetadata);

  return;
}








// const documents = [];
// const fileName = file.name;
// const fileSize = file.size;
// const date = new Date();
// const dateShort = date
//   .toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   })
//   .replace(/\//g, "");

// const tmpFile = new File([file], fileName, { type: file.type });
// const fileSha1 = await computeSHA1FromFile(tmpFile);

// const loader = new loaderClass(tmpFile);
// const loadedDocuments = await loader.load();

// const chunkSizeValue = chunkSize;
// const chunkOverlapValue = chunkOverlap;

// // Modify the code to match your desired text splitting logic
// const textSplitter = new RecursiveCharacterTextSplitter({
//   chunkSize: chunkSizeValue,
//   chunkOverlap: chunkOverlapValue,
// });

// const splittedDocuments = await textSplitter.splitDocuments(loadedDocuments);

// // Add the document sha1 as metadata to each document
// const docsWithMetadata = splittedDocuments.map(async (doc) => {
//   const pageContent = await doc.pageContent;
//   const docSha1 = await computeSHA1FromContent(pageContent);
//   return new Document({
//     pageContent: doc.pageContent,
//     metadata: {
//       fileSha1: fileSha1,
//       fileSize: fileSize,
//       fileName: fileName,
//       chunkSize: chunkSizeValue,
//       chunkOverlap: chunkOverlapValue,
//       date: dateShort,
//       docSha1: docSha1,
//     },
//   });
// });
// const supabase_url = "https://jqfandcxceztebtpwzxd.supabase.co";
// const supabase_key =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4";
// const openAIApiKey = "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";
// const resolvedDocsWithMetadata = await Promise.all(docsWithMetadata);
// const supabaseClient = createClient(supabase_url, supabase_key);
// const embedding = new OpenAIEmbeddings({ openAIApiKey });

// for (const docWithMetadata of resolvedDocsWithMetadata) {
//   const { page_content, metadata } = docWithMetadata;

//   // Assuming 'document' is the correct field name to store 'pageContent' in the database
//   // If not, replace 'document' with the correct field name in the insert query

//   const { data, error } = await supabaseClient.from("documents").insert({
//     content: page_content,
//     metadata: metadata,
//     embedding: embedding,
//   });

//   if (error) {
//     console.error("Error inserting document:", error);
//     // Handle the error as needed
//   } else {
//     // @ts-ignore
//     const insertedId = data; // Access the 'id' property from the 'data' object
//     console.log(`✅ Document ${data} inserted.`);
//   }

//   // Perform any additional processing or error handling if needed
//   // 'id' will be the new record's primary key returned by the insert query

//   console.log(`✅ Document ${data} inserted.`);
// }
// // await supabaseClient.from('documents').insert({
// //   content: document,
// //   embedding,
// // })
// //vectorStore.addDocuments(resolvedDocsWithMetadata);

// return;
// }
