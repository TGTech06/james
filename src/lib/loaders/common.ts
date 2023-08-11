import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  computeSHA1FromFile,
  computeSHA1FromContent,
} from "./utils.js";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL, PUBLIC_HUGGINGFACE_API_KEY, PUBLIC_OPENAI_API_KEY } from "$env/static/public";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import * as pdfjsLib from 'pdfjs-dist';
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
//  GlobalWorkerOptions.workerSrc = './src/lib/loaders/pdf.worker.js'; // Replace with the actual path to the worker script

  const chunkSizeValue = chunkSize;
  const chunkOverlapValue = chunkOverlap;

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSizeValue,
    chunkOverlap: chunkOverlapValue,
  });
  const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

  // let session = await client.auth.getSession();
  let user = await client.auth.getUser();
  let userID = user.data.user.id;
  console.log("userID", userID);

  let splittedDocuments;
  console.log("isUrl", isUrl)
  if (isUrl === true) {
    console.log("isUrl", isUrl)
    // const loadedContent = [await file.data()]; 
    const reader = new FileReader();

    // Set up an event listener to handle when the file content is loaded
    reader.onload = async function (event) {
      const fileContent = event.target.result; // This will contain the content of the file
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
      console.log("splittedDocuments", splittedDocuments[0].user_id)
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
      // const embeddings = new HuggingFaceInferenceEmbeddings({
      //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
      // });
      
      const openAIApiKey = PUBLIC_OPENAI_API_KEY;
      const embeddings = new OpenAIEmbeddings({ openAIApiKey });
      // const embeddings = new HuggingFaceInferenceEmbeddings({
      //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
      // });
      console.log("user_id", userID);
      let vector = new SupabaseVectorStore(embeddings, {
        client,
        queryName: "insert",
        tableName: "documents",
      });
      vector.addDocuments(docsWithMetadata);
    };
  
    await reader.readAsText(file);
    
    
  } else if (fileSuffix === ".pdf") {
    console.log("isPdf")
    const tmpFile = new File([file], fileName, { type: file.type });
    fileSha1 = await computeSHA1FromFile(tmpFile);
    const pdfData = await fetchFileAsArrayBuffer(tmpFile);
    // const arrayBuffer = await new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.onloadend = () => resolve(reader.result);
    //   reader.onerror = reject;
    //   reader.readAsArrayBuffer(tmpFile);
    // });
    //const pdfData = new Uint8Array(arrayBuffer);
const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
const pdfText = await extractTextFromPDF(pdf);
    console.log("pdfText", pdfText);
    // Function to split pdfText into individual document chunks
  
    
    
    // ... Your existing code to fetch the file as an ArrayBuffer ...
    
    // Now, extract text from PDF and generate the loadedDocuments array
   // const pdfText = await extractTextFromPDF(pdfData);
   // const loadedDocuments = splitTextIntoChunks(pdfText);
    

// Generate the loadedDocuments array from the pdfText
   // const loadedDocuments = splitTextIntoChunks(pdfText);
    // console.log("loadedDocuments", loadedDocuments);
    // const documentsWithMetadata = loadedDocuments.map(document => ({
    //   ...document,
    //   metadata: {
    //     file_sha1: fileSha1,
    //     file_size: fileSize,
    //     file_name: fileName,
    //     chunk_size: chunkSize,
    //     chunk_overlap: chunkOverlap,
    //     date: dateShort,
    //   },
    // })); 
    const documentObject = {
        pageContent: pdfText,
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
// Now, let's split the documents using textSplitter.splitDocuments
    //splittedDocuments = await textSplitter.splitDocuments(documentsWithMetadata);
    console.log("splittedDocuments", splittedDocuments);
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
    // const embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    // });
    
    const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    const embeddings = new OpenAIEmbeddings({ openAIApiKey });
    // const embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    // });
    console.log("user_id", userID);
    let vector = new SupabaseVectorStore(embeddings, {
      client,
      queryName: "insert",
      tableName: "documents",
    });

    console.log("docs Metadata", docsWithMetadata[0].user_id);
    vector.addDocuments(docsWithMetadata);

// const loader = new loaderClass(tmpFile);
// const loadedDocuments = await loader.load();
// splittedDocuments = await textSplitter.splitDocuments(loadedDocuments);

  }else
    {
    const tmpFile = new File([file], fileName, { type: file.type });
    fileSha1 = await computeSHA1FromFile(tmpFile);

  const loader = new loaderClass(tmpFile);
    const loadedDocuments = await loader.load();
    splittedDocuments = await textSplitter.splitDocuments(loadedDocuments);
  }

  

  // Modify the code to match your desired text splitting logic
  // const splitter = {
  //   splitDocuments: function (documents) {
  //     return documents.map((doc, index) => ({
  //       id: uuidv4(), // Generate a unique ID for each document
  //       page_content: doc,
  //     }));
  //   },
  // };
 

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

// const openAIApiKey = "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"; 
  // const embeddings = new HuggingFaceInferenceEmbeddings({
  //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
  // });
  const openAIApiKey = PUBLIC_OPENAI_API_KEY;
  const embeddings = new OpenAIEmbeddings({ openAIApiKey });
  // const embeddings = new HuggingFaceInferenceEmbeddings({
  //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
  // });
 // let embeddings = new OpenAIEmbeddings({ openAIApiKey }); // Replace with your actual OpenAI API key
 console.log("user_id", userID);
  let vector = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "insert",
  });

  console.log("docsWithMetadata", docsWithMetadata);
  try {

    vector.addDocuments(docsWithMetadata);
  } catch (error) {
    console.log("error", error);
  }
  

  return;
}

async function extractTextFromPDF(pdf) {
  let text = '';

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    text += pageText + ' '; // You can modify how you want to concatenate the text from different pages.
  }

  return text;
}

async function fetchFileAsArrayBuffer(file) {
  const response = await fetch(URL.createObjectURL(file));
  return await response.arrayBuffer();
}