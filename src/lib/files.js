import { processTxt } from "./loaders/txt";
import { process_pdf } from "./loaders/pdf";
import { processHtml } from "./loaders/html";
import { computeSHA1FromContent } from "./utils";
import { getHtml, createHtmlFile, deleteTempFile } from "./loaders/html";
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

  // console.log(PUBLIC_OPENAI_API_KEY);
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
}

export async function file_uploader(supabase, openai_key, vector_store, files) {
  if (!Array.isArray(files)) {
    // Handle a single file
    files = [files];
  }

  console.log(files);
  for (const file of files) {
    await filter_file(file, supabase, vector_store);
  }
}

async function file_already_exists(supabase, file) {
  const file_sha1 = computeSHA1FromContent(file);
  // Assuming compute_sha1_from_content is implemented separately
  let supa = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
  const { data, error } = await supa
    .from("documents")
    .select("id")
    .eq("metadata->>file_sha1", file_sha1);

  if (error) {
    console.log(`Error retrieving data: ${error.message}`);
    return false;
  }

  return data.length > 0;
}

async function filter_file(file, supabase, vector_store) {
  if (await file_already_exists(supabase, file)) {
    console.log(`😎 ${file.name} is already in the database.`);
    return false;
  } else if (file.size < 1) {
    console.log(`💨 ${file.name} is empty.`);
    return false;
  } else {
    //TODO implement new file upload system to an assistant
    // const file_extension = `.${file.name.split(".").pop()}`;
    // console.log(file.name, file_extension);
    // if (file_extension in file_processors) {
    //   const openAIApiKey = PUBLIC_OPENAI_API_KEY;
    //   let client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
    //   // const embeddings = new HuggingFaceInferenceEmbeddings({
    //   //   apiKey: PUBLIC_HUGGINGFACE_API_KEY,
    //   // });
    //   let embeddings = new OpenAIEmbeddings({ openAIApiKey });
    //   let vector = new SupabaseVectorStore(embeddings, {
    //     client,
    //     tableName: "documents",
    //   });
    //   await file_processors[file_extension](vector, file);
    //   console.log(`✅ ${file.name}`);
    //   return true;
    // } else {
    //   console.log(`❌ ${file.name} is not a valid file type.`);
    //   return false;
    // }
  }
}

export async function url_uploader(supabase, openai_key, vector_store, url) {
  const html = await getHtml(url);
  console.log(html);
  const file = createHtmlFile(url, html);

  console.log(file);
  await process_file(
    vector_store,
    file,
    UnstructuredLoader,
    ".html",
    500,
    0,
    true
  );
}
