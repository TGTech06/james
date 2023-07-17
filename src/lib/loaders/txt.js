//convert python code to javascript
// from .common import process_file
// from langchain.document_loaders import TextLoader

// def process_txt(vector_store, file):
//     return process_file(vector_store, file, TextLoader, ".txt")
//js code
import { processFile } from "./common";
import { TextLoader } from "langchain/document_loaders";

export function processTxt(vectorStore, file) {
  return processFile(vectorStore, file, TextLoader, ".txt");
}
