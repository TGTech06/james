import { process_file } from "./common";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
// import fs from "fs";

export async function processHtml(vector_store, file) {
  return process_file(vector_store, file, UnstructuredLoader, ".html");
}

export async function getHtml(url) {
  const queryParams = new URLSearchParams({ url });
  const endpointUrl = "https://jameswebscraper.tgtech06.workers.dev/"; // Replace with your actual Cloudflare worker URL
  try {
    const response = await fetch(
      `${endpointUrl}?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the data.");
    }

    const data = await response.text();
    console.log("Scraped data:", data); // You can use this data in your app as needed
  } catch (error) {
    console.error("Error occurred while scraping:", error);
  }
}

// export async function getHtml(url) {
//   try {
//     // const response = await axios.get(url);
//     // const url = "https://en.wikipedia.org/wiki/GitHub_Copilot";
//     const queryParams = new URLSearchParams({ url });
//     const apiUrl = `/api?${queryParams.toString()}`;
//     const response = await fetch(apiUrl, {
//       method: "GET",
//     });
//     if (response.status === 200) {
//       let retrievedText = await response.text();
//       return retrievedText;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     return null;
//   }
// }

class CustomFile extends Blob {
  constructor(parts, properties) {
    super(parts, properties);
    this.name = properties.name;
    this.lastModifiedDate = new Date();
  }
}

export function createHtmlFile(url, content) {
  const file_name = slugify(url) + ".html";
  const uploaded_file = new CustomFile([content], {
    type: "text/html",
    name: file_name,
  });

  return uploaded_file;
}

export function deleteTempFile(temp_file_path, url, ret) {
  try {
    // fs.unlinkSync(temp_file_path);
    if (ret) {
      console.log(`✅ Content saved... ${url}`);
    }
  } catch (error) {
    console.log(`❌ Error while saving content... ${url}`);
  }
}

function slugify(text) {
  text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  text = text
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase();
  text = text.replace(/[-\s]+/g, "-");
  return text;
}
