import { process_file } from "./common";
//import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

export function process_pdf(vectorStore, file) {
  return process_file(vectorStore, file, TextLoader, ".pdf", 500, 0);
}
