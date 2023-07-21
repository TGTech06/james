import { process_file } from "./common";
import { TextLoader } from "langchain/document_loaders/fs/text";

export function processTxt(vectorStore, file) {
  return process_file(vectorStore, file, TextLoader, ".txt", 500, 0);
}
