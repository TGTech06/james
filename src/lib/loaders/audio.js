// import { BytesIO } from "bytesio";
// import NamedTemporaryFile from "tempfile"
// import openai from "openai";
// import { writable } from "svelte/store";
// import { TextLoader } from "langchain/document_loaders";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { computeSha1FromContent } from "/Users/tommasogiovannini/VSCode Projects/james/src/lib/utils.js";

// // Create a function to transcribe audio using Whisper
// export async function _transcribeAudio(apiKey, audioFile) {
//   openai.api_key = apiKey;
//   let transcript = "";

//   const audioBytes = new BytesIO(await audioFile.arrayBuffer());
//   const fileExtension = `.${audioFile.name.split(".").pop()}`;

//   const tempAudioFile = await NamedTemporaryFile({ suffix: fileExtension });
//   await tempAudioFile.write(audioBytes.read());
//   await tempAudioFile.seek(0);

//   transcript = await openai.Audio.translate("whisper-1", tempAudioFile);

//   return transcript;
// }

// export async function processAudio(vectorStore, fileName) {
//   let fileSha = "";
//   const dateShort = new Date().toISOString().replace(/[-:.]/g, "").slice(0, -4);
//   const fileMetaName = `audiotranscript_${dateShort}.txt`;
//   const openaiApiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
//   const transcript = await _transcribeAudio(openaiApiKey, fileName);
//   fileSha = computeSha1FromContent(transcript.text.encode("utf-8"));
//   const fileSize = transcript.text.encode("utf-8").length;

//   const chunkSize = $session.chunk_size;
//   const chunkOverlap = $session.chunk_overlap;

//   const textSplitter = RecursiveCharacterTextSplitter.fromTiktokenEncoder({
//     chunkSize,
//     chunkOverlap,
//   });
//   const texts = textSplitter.splitText(transcript.text);

//   const docsWithMetadata = texts.map((text) =>
//     Document.fromObject({
//       page_content: text,
//       metadata: {
//         file_sha1: fileSha,
//         file_size: fileSize,
//         file_name: fileMetaName,
//         chunk_size: chunkSize,
//         chunk_overlap: chunkOverlap,
//         date: dateShort,
//       },
//     })
//   );

//   vectorStore.addDocuments(docsWithMetadata);
//   return vectorStore;
// }
