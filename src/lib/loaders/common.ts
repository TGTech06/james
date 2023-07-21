import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  computeSHA1FromFile,
  computeSHA1FromContent,
} from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/utils.js";
import { createClient } from "@supabase/supabase-js";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL, PUBLIC_HUGGINGFACE_API_KEY, PUBLIC_OPENAI_API_KEY  } from "$env/static/public";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { v4 as uuidv4 } from 'uuid';
export async function process_file(
  vectorStore,
  file,
  loaderClass,
  fileSuffix,
  chunkSize,
  chunkOverlap, 
  isUrl
) {
  const documents = [];
  const fileName = file.name;
  const fileSize = file.size;
  const dateShort = new Date();
  let fileSha1;

  const chunkSizeValue = chunkSize;
  const chunkOverlapValue = chunkOverlap;

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSizeValue,
    chunkOverlap: chunkOverlapValue,
  });
  let splittedDocuments;
  console.log("isUrl", isUrl)
  if (isUrl === true) {
    console.log("isUrl", isUrl)
    // const loadedContent = [await file.data()]; 
    const reader = new FileReader();

    // Set up an event listener to handle when the file content is loaded
    reader.onload = async function (event) {
      const fileContent = event.target.result; // This will contain the content of the file
      console.log("fileContent", fileContent);

      const documentObject = {
        pageContent: fileContent.toString(),
        metadata: {
          file_sha1: fileSha1,
          file_size: fileSize,
          file_name: fileName,
          chunk_size: chunkSize,
          chunk_overlap: chunkOverlap,
          date: dateShort,
        },
      };
    
      splittedDocuments = await textSplitter.splitDocuments([documentObject]);
      console.log("splittedDocuments", splittedDocuments)
      fileSha1 = await computeSHA1FromContent(fileContent);// You can use the file content here
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
  // const supabase_url = "https://jqfandcxceztebtpwzxd.supabase.co";
  // const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4";
  const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
// const openAIApiKey = "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"; 
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: PUBLIC_HUGGINGFACE_API_KEY, 
  });
      
  let vector = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  console.log(docsWithMetadata);
  vector.addDocuments(docsWithMetadata);
    };
  
    await reader.readAsText(file);
    
    
  } else {
    const tmpFile = new File([file], fileName, { type: file.type });
    fileSha1 = await computeSHA1FromFile(tmpFile);

  const loader = new loaderClass(tmpFile);
    const loadedDocuments = await loader.load();
    splittedDocuments = await textSplitter.splitDocuments(loadedDocuments);
  }

  

  // Modify the code to match your desired text splitting logic
  const splitter = {
    splitDocuments: function (documents) {
      return documents.map((doc, index) => ({
        id: uuidv4(), // Generate a unique ID for each document
        page_content: doc,
      }));
    },
  };
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
  
  // const supabase_url = "https://jqfandcxceztebtpwzxd.supabase.co";
  // const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmFuZGN4Y2V6dGVidHB3enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNzI0NzUsImV4cCI6MjAwNDk0ODQ3NX0.MXs4u_1XMM-foNe08LLYHQLENjmwTF3jqUmNXCSbOU4";
  const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
// const openAIApiKey = "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"; 
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: PUBLIC_HUGGINGFACE_API_KEY, 
  });
 // let embeddings = new OpenAIEmbeddings({ openAIApiKey }); // Replace with your actual OpenAI API key

  let vector = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  console.log(docsWithMetadata);
  vector.addDocuments(docsWithMetadata);

  return;
}