import { processTxt } from "./loaders/txt";
import { process_pdf } from "./loaders/pdf";
import { processHtml } from "./loaders/html";
import { computeSHA1FromContent } from "./utils";
import { getHtml, createHtmlFile, deleteTempFile } from "./loaders/html";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { process_file } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/loaders/common.ts";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
  PUBLIC_HUGGINGFACE_API_KEY,
} from "$env/static/public";
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
    const file_extension = `.${file.name.split(".").pop()}`;
    console.log(file.name, file_extension);
    if (file_extension in file_processors) {
      // const openAIApiKey = PUBLIC_OPENAI_API_KEY;
      let client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);
      const embeddings = new HuggingFaceInferenceEmbeddings({
        apiKey: PUBLIC_HUGGINGFACE_API_KEY,
      });
      // let embeddings = new OpenAIEmbeddings({ openAIApiKey });
      let vector = new SupabaseVectorStore(embeddings, {
        client,
        tableName: "documents",
      });

      await file_processors[file_extension](vector, file);

      console.log(`✅ ${file.name}`);
      return true;
    } else {
      console.log(`❌ ${file.name} is not a valid file type.`);
      return false;
    }
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
