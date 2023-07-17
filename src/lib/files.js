// import { onMount } from "svelte";
// import { writable } from "svelte/store";
// // import { processAudio } from "./loaders/audio";
// import { processTxt } from "./loaders/txt";
// // import { processCsv } from "./loaders/csv";
// // import { processMarkdown } from "./loaders/markdown";
// import {
//   processHtml,
//   getHtml,
//   createHtmlFile,
//   deleteTempFile,
// } from "./loaders/html";
// import { computeSha1FromContent } from "./utils";
// // import requests from "requests";
// // import re from "re";
// // import unicodedata from "unicodedata";
// // import tempfile from "tempfile";

// const fileProcessors = {
//   ".txt": processTxt,
//   // ".csv": processCsv,
//   // ".md": processMarkdown,
//   // ".markdown": processMarkdown,
//   // ".m4a": processAudio,
//   // ".mp3": processAudio,
//   // ".webm": processAudio,
//   // ".mp4": processAudio,
//   // ".mpga": processAudio,
//   // ".wav": processAudio,
//   // ".mpeg": processAudio,
//   // ".pdf": processPdf,
//   ".html": processHtml,
// };

// export function fileUploader(supabase, openaiKey, vectorStore) {
//   const files = writable([]);

//   onMount(() => {
//     const uploader = document.createElement("input");
//     uploader.type = "file";
//     uploader.accept = Object.keys(fileProcessors).join(",");
//     uploader.multiple = true;

//     uploader.addEventListener("change", (event) => {
//       files.set(Array.from(event.target.files));
//     });

//     uploader.click();
//   });

//   async function addToDatabase() {
//     const fileList = files;

//     if (fileList.length > 0) {
//       for (const file of fileList) {
//         await filterFile(file, supabase, vectorStore);
//       }
//     }
//   }

//   async function filterFile(file, supabase, vectorStore) {
//     if (await fileAlreadyExists(supabase, file)) {
//       console.log(`😎 ${file.name} is already in the database.`);
//       return false;
//     } else if (file.size < 1) {
//       console.log(`💨 ${file.name} is empty.`);
//       return false;
//     } else {
//       const fileExtension = getFileExtension(file.name);
//       console.log(file.name, fileExtension);
//       if (fileExtension in fileProcessors) {
//         await fileProcessors[fileExtension](vectorStore, file);
//         console.log(`✅ ${file.name}`);
//         return true;
//       } else {
//         console.log(`❌ ${file.name} is not a valid file type.`);
//         return false;
//       }
//     }
//   }

//   async function fileAlreadyExists(supabase, file) {
//     const fileSha1 = await computeSha1FromContent(file);
//     const response = await supabase
//       .table("documents")
//       .select("id")
//       .eq("metadata->>file_sha1", fileSha1)
//       .execute();
//     return response.data.length > 0;
//   }

//   function getFileExtension(filename) {
//     return "." + filename.split(".").pop().toLowerCase();
//   }

//   return {
//     files,
//     addToDatabase,
//   };
// }

// export function urlUploader(supabase, openaiKey, vectorStore) {
//   const url = "";

//   async function addUrlToDatabase() {
//     const urlValue = url;

//     if (urlValue !== "") {
//       const html = await getHtml(urlValue);

//       if (html) {
//         console.log(`Getting content ... ${urlValue}`);
//         const { file, tempFilePath } = await createHtmlFile(urlValue, html);
//         const ret = await filterFile(file, supabase, vectorStore);
//         await deleteTempFile(tempFilePath, urlValue, ret);
//       } else {
//         console.log(`❌ Failed to access ${urlValue}.`);
//       }
//     }
//   }

//   return {
//     url,
//     addUrlToDatabase,
//   };
// }

import { processTxt } from "./loaders/txt";
import { processHtml } from "./loaders/html";
import { computeSha1FromContent } from "./utils";
import { getHtml, createHtmlFile, deleteTempFile } from "./loaders/html";
import axios from "axios";
import FormData from "form-data";
import {
  files,
  addToDatabaseButtonClicked,
  url,
  buttonClicked,
} from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/stores.js";

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
  // '.pdf': process_pdf,
  ".html": processHtml,
};

export async function file_uploader(supabase, openai_key, vector_store, files) {
  // Svelte implementation for file uploading
  // const files = $files;/* Get uploaded files */
  //const addToDatabaseButtonClicked = /* Check if "Add to Database" button is clicked */

  if (addToDatabaseButtonClicked && files) {
    for (const file of files) {
      await filter_file(file, supabase, vector_store);
    }
  }
}

async function file_already_exists(supabase, file) {
  const file_sha1 = computeSha1FromContent(file); // Assuming compute_sha1_from_content is implemented separately
  const response = await supabase
    .table("documents")
    .select("id")
    .eq("metadata->>file_sha1", file_sha1)
    .execute();
  return response.data.length > 0;
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
      await file_processors[file_extension](vector_store, file);
      console.log(`✅ ${file.name}`);
      return true;
    } else {
      console.log(`❌ ${file.name} is not a valid file type.`);
      return false;
    }
  }
}

export async function url_uploader(supabase, openai_key, vector_store, url) {
  // const url = "https://en.wikipedia.org/wiki/Google_AI";/* Get the URL from the text area */
  // const buttonClicked = true;/* Check if the button is clicked */

  const response = await axios.get(url);
  if (response.status === 200) {
    console.log(`Getting content... ${url}`);
    const html = response.data;
    const { uploaded_file, temp_file_path } = createHtmlFile(url, html);
    const ret = await filter_file(uploaded_file, supabase, vector_store);
    deleteTempFile(temp_file_path, url, ret);
  } else {
    console.log(`❌ Failed to access ${url}.`);
  }
}
