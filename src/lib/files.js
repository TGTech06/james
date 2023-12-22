import { processTxt } from "./loaders/txt";
import { process_pdf } from "./loaders/pdf";
import { processHtml } from "./loaders/html";
import { computeSHA1FromContent } from "./utils";
import { getHtml, convertHtmlToTxt, createPdfFile } from "./loaders/html"; // Import your existing functions

// import { getHtml, createPdfFile} from "./loaders/html";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { process_file } from "./loaders/common.ts";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { OpenAI } from "openai";
import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
  PUBLIC_HUGGINGFACE_API_KEY,
  PUBLIC_OPENAI_API_KEY,
} from "$env/static/public";
import { supabaseClient } from "./supabase.ts";
const file_processors = {
  ".txt": processTxt,
  // '.csv': process_csv,
  // '.md': process_markdown,
  // '.markdown': process_markdown,
  // '.m4a': process_audio,
  // '.mp3': process_audio,
  // '.webm': process_audio,
  // '.mp4': process_audio,
  // '.mpga': process_audio,
  // '.wav': process_audio,
  // '.mpeg': process_audio,
  ".pdf": process_pdf,
  ".html": processHtml,
};
let userID;
async function getUserID() {
  try {
    let supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    let user = await supabase.auth.getUser();
    userID = user.data.user.id;
  } catch (e) {
    console.log(e);
  }
}

async function getAssistantID() {
  await getUserID();
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
      console.log("Assistant ID:", assistantId);
      return assistantId;
    } else {
      console.log("User not found");
    }
  }
}

export async function upload_file(files) {
  let assistantId = await getAssistantID();
  console.log("files: ", files);
  // console.log(PUBLIC_OPENAI_API_KEY);
  if (files) {
    try {
      const client = new OpenAI({
        apiKey: PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const uploadResult = await client.files.create({
        file: files,
        purpose: "assistants",
      });
      // console.log(uploadResult);
      let currentFiles = await client.beta.assistants.files.list(assistantId);
      let file_ids = [];
      for (var i = 0; i < currentFiles.data.length; i++) {
        file_ids.push(currentFiles.data[i].id);
      }
      file_ids.push(uploadResult.id);
      client.beta.assistants.update(assistantId, {
        file_ids: file_ids,
      });
    } catch (E) {
      console.log(E);
    }
  } else {
    console.log("files is null");
  }
}

export async function url_uploader(url) {
  try {
    const htmlContent = await getHtml(url);

    if (htmlContent) {
      const txtBlob = await convertHtmlToTxt(htmlContent, url);
      console.log(txtBlob);
      if (txtBlob) {
        const txtFile = new File([txtBlob], url, { type: "text/plain" });
        if (txtFile) {
          await upload_file(txtFile);
        } else {
          console.log("txtFile is null");
        }
      } else {
        console.log("txtBlob is null");
      }
      // await upload_file(txtFile);
      // const client = new OpenAI({
      //   apiKey: PUBLIC_OPENAI_API_KEY,
      //   dangerouslyAllowBrowser: true,
      // });
      // let assistantId = await getAssistantID();

      // const currentFiles = await client.beta.assistants.files.list(assistantId);

      // const fileIds = currentFiles.data.map((file) => file.id);
      // fileIds.push(pdfFile.blob.id);

      // await client.beta.assistants.update(assistantId, {
      //   file_ids: fileIds,
      // });

      //console.log(`PDF file ${pdfFile.name} added to the OpenAI assistant.`);
    }
  } catch (error) {
    console.error(`Error uploading PDF to OpenAI assistant: ${error}`);
  }
}

// export async function file_uploader(supabase, openai_key, vector_store, files) {
//   if (!Array.isArray(files)) {
//     // Handle a single file
//     files = [files];
//   }

//   console.log(files);
//   for (const file of files) {
//     await filter_file(file, supabase, vector_store);
//   }
// }

// async function file_already_exists(supabase, file) {
//   const file_sha1 = computeSHA1FromContent(file);
//   // Assuming compute_sha1_from_content is implemented separately
//   let supa = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
//   const { data, error } = await supa
//     .from("documents")
//     .select("id")
//     .eq("metadata->>file_sha1", file_sha1);

//   if (error) {
//     console.log(`Error retrieving data: ${error.message}`);
//     return false;
//   }

//   return data.length > 0;
// }
