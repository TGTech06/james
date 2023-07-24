import { process_file } from "./common";
//import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
export function process_pdf(vectorStore, file) {
  return process_file(vectorStore, file, PDFLoader, ".pdf", 500, 0);
}
